const asyncHandler = require("express-async-handler")
require('dotenv').config();
const Task = require('../models/taskModel');
const SubTask = require('../models/subTaskModel')

//Create task
// Input: title,DESC & DUE_DATE
const createTask = asyncHandler(async (req, res) => {
    const { title, description, due_date } = req.body;

    // Ensure all fields are provided
    if (!title || !description || !due_date) {
        res.status(400);
        throw new Error("Title, description, and due date are mandatory");
    }

    const existingTask = await Task.findOne({ user: req.user.id, title });
    if (existingTask) {
        res.status(400);
        res.send("Task by same title already present")
        throw new Error("Task already exists with the same title");
    }

    try {
        // Create task
        const task = await Task.create({
            user: req.user.id, // Assuming user ID is stored in req.user after authentication
            title,
            description,
            due_date
        });

        // Send response
        res.status(201).json(task);
    } catch (error) {
        res.status(400);
        throw new Error("Failed to create task");
    }
});




// sibtask
// task_id (int)//references task table // we do this through unique title of every task to get task_id
// status (0,1) //0- incomplete, 1- complete
const createSubTask = asyncHandler(async (req, res) => {
    const { title, status } = req.body;
    const user_id = req.user.id; // Assuming user ID is stored in req.user after authentication

    // Set default status to 0 if not provided or not valid
    const subTaskStatus = status && [0, 1].includes(status) ? status : 0;

    try {
        // Find the task with the provided title belonging to the user
        const task = await Task.findOne({ user: user_id, title });

        if (!task) {
            res.status(404);
            throw new Error("Task not found");
        }

        // Create subtask with the found task's ID
        const subTask = await SubTask.create({
            task_id: task._id,
            status: subTaskStatus
        });

        // Check if all subtasks of the task are completed
        const allSubTasks = await SubTask.find({ task_id: task._id });
        const isAllSubTasksCompleted = allSubTasks.every(task => task.status === 1);

        // Update the status of the task based on the subtasks
        if (isAllSubTasksCompleted) {
            task.status = 'DONE';
        } else {
            const isAnyTaskInProgress = allSubTasks.some(task => task.status === 1);
            task.status = isAnyTaskInProgress ? 'IN_PROGRESS' : 'TODO';
        }

        await task.save();

        // Send response
        res.status(201).json(subTask);
    } catch (error) {
        res.status(400);
        throw new Error("Failed to create subtask");
    }
});






module.exports = {createTask,createSubTask};