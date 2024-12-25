const express = require('express');
const Task = require('../models/model.task');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

// Get all tasks for the authenticated user
router.get('/', authMiddleware, async (request, response) => {
    try {
        // Retrieve tasks for the authenticated user
        const tasks = await Task.find({ user: request.user._id }); // Filter by user ID
        response.status(200).json(tasks);
    } catch (err) {
        response.status(500).json({ error: 'Error fetching tasks', details: err.message });
    }
});

// Add a new task for the authenticated user
router.post('/add', authMiddleware, async (request, response) => {
    try {
        const { name, description, dueDate, status, priority } = request.body;

        // Validate required fields
        if (!name || !description || !dueDate || !priority) {
            return response.status(400).json({ error: 'All fields except status are required.' });
        }

        const task = new Task({ 
            name, 
            description, 
            dueDate, 
            status, 
            priority, 
            user: request.user._id 
        }); 
        await task.save();

        response.status(201).json({ message: 'Task created successfully', task });
    } catch (err) {
        response.status(400).json({ error: 'Error creating task', details: err.message });
    }
});

// Update a task
router.put('/:id', authMiddleware, async (request, response) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: request.params.id, user: request.user._id }, 
            request.body,
            { new: true, runValidators: true } // `runValidators` ensures validation rules are applied
        );

        if (!task) {
            return response.status(404).json({ error: 'Task not found' });
        }

        response.status(200).json({ message: 'Task updated successfully', task });
    } catch (err) {
        response.status(400).json({ error: 'Error updating task', details: err.message });
    }
});

// Delete a task
router.delete('/:id', authMiddleware, async (request, response) => {
    try {
        const task = await Task.findOneAndDelete({ _id: request.params.id, user: request.user._id }); 

        if (!task) {
            return response.status(404).json({ error: 'Task not found' });
        }

        response.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        response.status(500).json({ error: 'Error deleting task', details: err.message });
    }
});

module.exports = router;
