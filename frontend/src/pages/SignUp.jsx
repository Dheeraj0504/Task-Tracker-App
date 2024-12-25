import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newUser = {
            fullname: {
                firstName,
                lastName,
            },
            email,
            password,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/auth/register`,
                newUser
            );

            // console.log('Signup successful:', response.data);
            navigate('/'); // Redirect to login page
        } catch (error) {
            // console.error('Error during signup:', error);
            setErrorMessage(
                error.response?.data?.message || 'Signup failed. Please try again.'
            );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <img
                        className="w-50 h-10"
                        src="https://tasktracker.in/webassets/images/logoimages/tasktrackerlogo.webp"
                        alt="Task-tracker"
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <h3 className="text-xl font-semibold mb-4 text-center">Create Your Account</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                className="bg-gray-100 rounded border border-gray-300 px-4 py-2 w-1/2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="First Name"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                type="text"
                                className="bg-gray-100 rounded border border-gray-300 px-4 py-2 w-1/2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Last Name"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="bg-gray-100 rounded border border-gray-300 px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="email@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="bg-gray-100 rounded border border-gray-300 px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-blue-600 text-white font-bold rounded-lg py-2 w-full hover:bg-blue-700 transition"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{' '}
                        <Link to="/" className="text-blue-600 font-semibold underline hover:text-blue-800">
                            Login here
                        </Link>
                    </p>
                </form>
                {errorMessage && (
                    <p className="text-red-500 text-center mt-6">{errorMessage}</p>
                )}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        This site is protected by reCAPTCHA and the{' '}
                        <span className="underline text-blue-600 cursor-pointer">
                            Google Privacy Policy
                        </span>{' '}
                        and{' '}
                        <span className="underline text-blue-600 cursor-pointer">
                            Terms of Service
                        </span>{' '}
                        apply.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
