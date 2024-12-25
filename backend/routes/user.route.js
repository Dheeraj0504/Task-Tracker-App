const express = require('express');
const router = express.Router();
const User = require('../models/model.user');
const authMiddleware = require('../middleware/auth.middleware');

// Register a new user
router.post('/register', async (request, response) => {
    try {
        const { fullname, email, password } = request.body;
        const {firstName, lastName} = fullname;

        // Validate request data
        if (!firstName || !lastName || !email || !password) {
            return response.status(400).json({ error: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(400).json({ message: 'User already registered' });
        }

        // Create and save the user
        const user = new User({ fullname, email, password });
        await user.save();

        // Generate a token
        const token = user.generateAuthToken();

        // Return token and user data
        response.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                password: user.password,
            },
        });
    } catch (error) {
        response.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

// Login an existing user
router.post('/login', async (request, response) => {
    try{
        const { email, password } = request.body;

        // Validate request data
        if (!email || !password) {
            return response.status(400).json({ error: 'Email and password are required' });
        }

        // Check if the user exists
        const user = await User.findOne({ email }).select('+password'); 
        if (!user) {
            return response.status(401).json({ error: 'Invalid Email or Password' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return response.status(401).json({ error: 'Invalid Email or Password' });
        }

        // Generate a token
        const token = user.generateAuthToken();
        response.cookie('token', token)

        // Return token and user data
        response.status(200).json({
            message: 'Login successful',
            token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                password: user.password,
            },
        })
    }catch (error) {
        response.status(500).json({error: error.message });
    }    
})


// GET Profile - Requires Authentication
router.get('/profile', authMiddleware, async (request, response) => {
    try {
        // Retrieve the user based on the ID from the token
        const user = await User.findById(request.user._id).select('-password'); // Exclude password field
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        // Return user profile data
        response.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
        });
    } catch (error) {
        response.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

// Logout Route
router.get('/logout', authMiddleware, (request, response) => {
    response.clearCookie('token');
    response.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
