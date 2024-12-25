const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./database/db');
const authRoutes = require('./routes/user.route');
const taskRoutes = require('./routes/task.route');

connectToDb();
app.use(cors()); 
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

module.exports = app
