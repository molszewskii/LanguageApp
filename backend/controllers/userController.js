const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.registerUser = async(req,res)=>{
    const {username, email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"Email and password are required"});
    }

    if(username && (username.length < 3 || username.length > 20 )){
        return res.status(400).json({message: "Username must be between 3 and 20 characters long"});
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({message: "User registered successfully", user});
    }catch(error){
        res.status(500).json({message: "Failed to register user", error: error.message});
    }
}

exports.loginUser = async(req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"Email and password are required"});
    }

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid credentials"});
        }

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.status(200).json({message:"Logged in successfully", token});
    }catch(error){
        res.status(500).json({message:"Failed to log in", error: error.message});
    }
}