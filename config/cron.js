// cron.js

const cron = require('node-cron');
const Task = require('../models/taskModel');
const User = require('../models/userModel');
const twilio = require('twilio');

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

// Function to update task priority based on due date
const updateTaskPriority = async () => {
    try {
        // Get all tasks
        const tasks = await Task.find();

        // Loop through each task and update priority based on due date
        for (const task of tasks) {
            const currentDate = new Date();
            const timeDifference = task.due_date.getTime() - currentDate.getTime();
            const hoursDifference = Math.ceil(timeDifference / (1000 * 60 * 60));

            if (hoursDifference <= 24) {
                task.priority = 0;
            } else if (hoursDifference <= 72) {
                task.priority = 1;
            } else if (hoursDifference <= 120) {
                task.priority = 2;
            } else {
                task.priority = 3;
            }

            // Save the updated task
            await task.save();
        }

        console.log('Task priorities updated successfully');

        // Call function to initiate voice calls
        await initiateVoiceCalls();

    } catch (error) {
        console.error('Error updating task priorities:', error);
    }
};

// Function to initiate voice calls using Twilio
const initiateVoiceCalls = async () => {
    try {
        // Fetch tasks with priority 0
        const tasks = await Task.find({ priority: 0 });

        // Extract user IDs from tasks
        const userIds = tasks.map(task => task.user);

        // Fetch users sorted by priority
        const users = await User.find({ _id: { $in: userIds } }).sort({ priority: 1 });

        let previousUserAttendedCall = false;

        // Loop through each user and initiate voice call if necessary
        for (const user of users) {
            // Check if user needs to be called based on priority and if the previous user didn't attend the call
            if ( !previousUserAttendedCall) {
                const callResponse = await callUser(user.phone_number);
                // Check if the call was successful and the user answered
                if (callResponse && callResponse.status === 'queued') {
                    previousUserAttendedCall = false;
                } else {
                    // If the user didn't answer, break the loop and call the next user
                    console.log(`User ${user.phone_number} didn't answer. Calling the next user.`);
                    break;
                }
            } else {
                console.log(`Skipping call to ${user.phone_number}`);
            }
        }

        console.log('Voice calls initiated successfully');

    } catch (error) {
        console.error('Error initiating voice calls:', error);
    }
};



// Function to initiate voice call using Twilio
const callUser = async (phoneNumber) => {
    try {
        // Add the +91 country code before the phone number
        const toPhoneNumber = '+91' + phoneNumber;

        const call = await client.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml', // Twilio XML for voice call
            to: toPhoneNumber, // Use the phone number with +91 country code
            from: twilioPhoneNumber
        }).update({twiml: '<Response><Say>Ahoy there</Say></Response>'});

        console.log(`Voice call initiated to ${toPhoneNumber}`);
        return call;
    } catch (error) {
        console.error('Error initiating voice call:', error);
        return null;
    }
};


// Define the cron job schedule (runs every 12 hours)
cron.schedule('0 */12 * * *', updateTaskPriority);
// '0 */12 * * *'
module.exports = updateTaskPriority;
