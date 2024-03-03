const mongoose = require('mongoose');

// Define task schema
const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    // depends on how many subtasks done - status 1 for same user
    status: {
        type: String,
        enum: ['TODO', 'IN_PROGRESS', 'DONE'],
        default: 'TODO'
    },
    // depends on due date
    priority: {
        type: Number,
        required: true,
        default: 3 // Default priority
    }
}, { timestamps: true });


// Pre-save hook to update task status and priority based on subtask completion
taskSchema.pre('save', async function(next) {
    try {
        const SubTask = mongoose.model('SubTask');
        const subTasks = await SubTask.find({ user: this.user, task_id: this._id }).select('status');

        if (subTasks.length === 0) {
            this.status = 'DONE'; // Set status as 'DONE' if no subtasks are associated
        } else {
            const isAnyTaskInProgress = subTasks.some(task => task.status === 1);
            if (isAnyTaskInProgress) {
                this.status = 'IN_PROGRESS';
            } else {
                const isAllTasksCompleted = subTasks.every(task => task.status === 1);
                this.status = isAllTasksCompleted ? 'DONE' : 'IN_PROGRESS';
            }
        }

        // Calculate and set priority
        this.priority = this.calculatePriority();

        next();
    } catch (error) {
        next(error);
    }
});



// Create task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
