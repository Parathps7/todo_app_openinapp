const asyncHandler = require("express-async-handler")
require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt =  require('jsonwebtoken')
const User = require('../models/userModel')
const Task = require('../models/taskModel')
const SubTask = require('../models/subTaskModel')

//register
const getTask = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, priority, due_date } = req.query;
    const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
    
    // Construct filter object based on query parameters
    const filter = { user: userId };
    if (priority) {
        filter.priority = priority;
    }
    if (due_date) {
        filter.due_date = { $lte: new Date(due_date) };
    }
    
    try {
        // Count total number of tasks matching filter
        const totalTasks = await Task.countDocuments(filter);
        
        // Query tasks with pagination
        const tasks = await Task.find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ due_date: 1 }); // Sort by due date in ascending order
        
        // Send response
        res.status(200).json({
            totalTasks,
            totalPages: Math.ceil(totalTasks / limit),
            currentPage: page,
            tasks
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve tasks" });
    }
});





// login
const getSubTask = asyncHandler(async (req, res) => {
    const { task_id } = req.query;
    console.log(task_id)
    const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
    
    // Construct filter object based on query parameters
    const filter = { user: userId };
    if (task_id) {
        filter.task_id = task_id;
    }
    
    try {
        // Query subtasks
        const subtasks = await SubTask.find(filter);
        
        // Send response
        res.status(200).json(subtasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve subtasks" });
    }
});


module.exports = {getTask,getSubTask};