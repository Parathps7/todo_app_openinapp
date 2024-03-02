const asyncHandler = require("express-async-handler")
require('dotenv').config();
const Task = require('../models/taskModel');
const SubTask = require('../models/subTaskModel')

//Create task
// Input: title,DESC & DUE_DATE
const deleteTask = asyncHandler(async (req, res) => {
    const { task_id } = req.params;
    const user_id = req.user.id; // Assuming user ID is stored in req.user after authentication
    try {
        // Find the task by task_id and user_id
        const task = await Task.findOne({ _id: task_id, user: user_id });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Delete the task
        await task.deleteOne();

        // Send success response
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Failed to delete task" });
    }
});






// sibtask
// task_id (int)//references task table // we do this through unique title of every task to get task_id
// status (0,1) //0- incomplete, 1- complete
const deleteSubTask = asyncHandler(async (req, res) => {
    const { subtask_id } = req.params;
    const user_id = req.user.id; // Assuming user ID is stored in req.user after authentication

    // Ensure subtask_id is provided
    if (!subtask_id) {
        res.status(400);
        throw new Error("Subtask ID is mandatory");
    }

    try {
        // Find the subtask by ID and user_id
        const subtask = await SubTask.findOne({ _id: subtask_id, user: user_id });

        if (!subtask) {
            res.status(404);
            throw new Error("Subtask not found");
        }

        // Delete the subtask
        await SubTask.deleteOne();

        // Send response
        res.status(200).json({ message: "Subtask deleted successfully" });
    } catch (error) {
        res.status(400);
        throw new Error("Failed to delete subtask");
    }
});







module.exports = {deleteTask,deleteSubTask};