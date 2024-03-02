const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true,
        enum: [0, 1, 2]
    }
},{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);