const mongoose = require('mongoose');

const subTaskSchema = new mongoose.Schema({
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task', // References the Task model
        required: true
    },
    status: {
        type: Number,
        enum: [0, 1],
        default: 0 // Default status is incomplete (0)
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date,
        default: null
    }
});

const SubTask = mongoose.model('SubTask', subTaskSchema);

module.exports = SubTask;
