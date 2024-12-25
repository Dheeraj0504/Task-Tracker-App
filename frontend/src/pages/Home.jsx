import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const Home = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editTask, setEditTask] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        dueDate: '',
        status: 'Pending',
        priority: 'Low',
    });

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/');
        } else {
            fetchTasks();
        }
    }, [navigate]);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`${VITE_BASE_URL}/tasks`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            toast.error('Error fetching tasks');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEditTask = (task) => {
        setEditTask(task._id);
        setFormData({
            name: task.name,
            description: task.description,
            dueDate: task.dueDate.split('T')[0],
            status: task.status,
            priority: task.priority,
        });
    };

    const handleDeleteTask = async (id) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`${VITE_BASE_URL}/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchTasks();
            toast.success('Task deleted successfully!');
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Error deleting task');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            if (editTask) {
                await axios.put(`${VITE_BASE_URL}/tasks/${editTask}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success('Task updated successfully!');
            } else {
                await axios.post(`${VITE_BASE_URL}/tasks/add`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success('Task added successfully!');
            }
            setEditTask(null);
            setFormData({ name: '', description: '', dueDate: '', status: 'Pending', priority: 'Low' });
            fetchTasks();
        } catch (error) {
            console.error('Error saving task:', error);
            toast.error('Error saving task');
        }
    };

    const filteredTasks = tasks.filter((task) =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto lg:px-20 py-8">
                <form onSubmit={handleSubmit} className="mb-6 bg-[#f8f9fa] p-6 rounded shadow-lg">
                    <ToastContainer />
                    <h2 className="text-xl font-semibold mb-4">{editTask ? 'Edit Task' : 'Add Task'}</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Task Name"
                        className="border p-2 mr-2 w-full mb-4 rounded"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Task Description"
                        className="border p-2 mr-2 w-full mb-4 rounded"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        required
                    />
                    <input
                        type="date"
                        name="dueDate"
                        className="border p-2 mr-2 w-full mb-4 rounded"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        required
                    />
                    <div className="flex flex-col md:flex-row mb-4">
                        <select
                            name="priority"
                            className="border p-2 mr-2 w-full mb-2 md:mb-0 md:w-1/2 rounded"
                            value={formData.priority}
                            onChange={handleInputChange}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <select
                            name="status"
                            className="border p-2 mr-2 w-full md:w-1/2 rounded"
                            value={formData.status}
                            onChange={handleInputChange}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-10 py-2 rounded mx-auto block hover:bg-blue-600 transition">
                        {editTask ? 'Update Task' : 'Add Task'}
                    </button>
                </form>
                <div className="flex justify-between items-center mb-2 mt-10">
                    <h1 className="text-[25px] font-bold text-blue-600">Task Lists</h1>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="border p-2 md:w-1/2 rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 mb-10" style={{ height: '4px' }}></div>

                {filteredTasks.length === 0 ? (
                    <p className="text-center text-lg text-gray-600">No tasks found.</p>
                ) : (
                    <ul className="list-none p-0 grid md:grid-cols-2 gap-4">
                        {filteredTasks.map((task) => {
                            const isOverdue = new Date(task.dueDate) < new Date();

                            return (
                                <li
                                    key={task._id}
                                    className={`border bg-white p-4 mb-4 flex flex-col rounded-lg shadow-lg ${
                                        isOverdue ? 'bg-red-100 border-red-500' : ''
                                    }`}
                                >
                                    <div className="mb-2">
                                        <h2 className={`font-bold text-lg ${isOverdue ? 'text-red-600' : ''}`}>
                                            {task.name}
                                        </h2>
                                        <p>{task.description}</p>
                                        <p className="text-gray-600">
                                            <span className="text-black font-semibold">Due:</span>{' '}
                                            {new Date(task.dueDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="text-black font-semibold">Status:</span> {task.status}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="text-black font-semibold">Priority:</span> {task.priority}
                                        </p>
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <button
                                            onClick={() => handleEditTask(task)}
                                            className="bg-yellow-600 text-white px-4 py-1 rounded mb-2 md:mb-0 font-semibold hover:bg-yellow-400 transition duration-300"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTask(task._id)}
                                            className="bg-red-600 text-white px-4 py-1 rounded font-semibold hover:bg-red-400 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Home;
