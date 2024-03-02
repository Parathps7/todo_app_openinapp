const asyncHandler = require("express-async-handler")
require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt =  require('jsonwebtoken')
const User = require('../models/userModel')

//register
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, phone_number, priority } = req.body;

    // Ensure all fields are provided
    if (!username || !email || !password || !phone_number) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    if(phone_number.length != 10){
        res.status(400);
        throw new Error("Phone number should be of 10 digits only")
    }

    // Check if user with the provided email already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set default priority to 3 if not provided or not within [0, 1, 2, 3]
    const userPriority = priority && [0, 1, 2, 3].includes(priority) ? priority : 2;

    // Create user with hashed password and provided fields
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        phone_number,
        priority: userPriority
    });

    console.log(`User created: ${user}`);

    // Send response
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email , phone_number: user.phone_number});
    } else {
        res.status(400);
        throw new Error("User data not valid");
    }
});




// login
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory") 
    }
    const user = await User.findOne({email});
    //compare password with hashed passowrd
    if(user!==null){
        const verify_password = await bcrypt.compare(password,user.password);
        if(verify_password){
            const accessToken = jwt.sign({
            user:{
                username: user.username,
                email:user.email,
                id: user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '15m'});
        res.status(200).json({accessToken})
        }
    }else{
        res.status(401)
        throw new Error("email or password not valid");
    }
    // res.json({message: "login user"})
});



//get
const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
});

module.exports = {registerUser,loginUser,currentUser};