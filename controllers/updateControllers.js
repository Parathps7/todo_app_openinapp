const asyncHandler = require("express-async-handler")
require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt =  require('jsonwebtoken')
const User = require('../models/userModel')
const Task = require('../models/taskModel')
const SubTask = require('../models/subTaskModel')

//update task
// status should not be changed as it depends upon the subtasks
const updateTask = asyncHandler(async (req, res) => {
    const { task_id, due_date } = req.body;
    
    try {
        // Find the task by ID
        let task = await Task.findById(task_id);
        
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        
        // Update task properties if provided
        if (due_date) {
            task.due_date = due_date;
        }
        
        // Save the updated task
        task = await task.save();
        
        // Send response
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Failed to update task" });
    }
});






// login
// subtask_id & status 
const updateSubTask = asyncHandler(async (req, res) => {
    const { subtask_id, status } = req.body;

    // Ensure subtask_id and status are provided
    if (!subtask_id || !status) {
        res.status(400);
        throw new Error("Subtask ID and status are mandatory");
    }

    // Validate status
    if (![0, 1].includes(status)) {
        res.status(400);
        throw new Error("Status must be 0 or 1");
    }

    try {
        // Find the subtask by ID and update the status
        const subtask = await SubTask.findByIdAndUpdate(subtask_id, { status }, { new: true });

        if (!subtask) {
            res.status(404);
            throw new Error("Subtask not found");
        }

        // Send response with updated subtask
        res.status(200).json(subtask);
    } catch (error) {
        res.status(400);
        throw new Error("Failed to update subtask");
    }
});



module.exports = {updateTask,updateSubTask};