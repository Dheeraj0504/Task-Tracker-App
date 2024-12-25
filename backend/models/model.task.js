const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: { 
        type: String, 
        required: true, 
        trim: true,
    },
    dueDate: { 
        type: Date, 
        required: true, 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Completed'], 
        default: 'Pending',
    },
    priority: { 
        type: String, 
        enum: ['Low', 'Medium', 'High'], 
        required: true,
    },
    user: { // Add user reference
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

module.exports = mongoose.model('Task', taskSchema);
