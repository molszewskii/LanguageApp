const Level = require("../models/Level");

exports.createLevel = async(req,res)=>{
    const {name, description} = req.body;

    if(!name || !description){
        return res.status(400).json({message: "Name and description are required"});
    }

    if(name.length < 3 || name.length > 50){
        return res.status(400).json({message: "Name must be between 3 and 50 characters long"});
    }

    if(description.length < 10 || description.length > 500){
        return res.status(400).json({message: "Description must be between 10 and 500 characters long"})
    }

    try{
        const existingLevel = await Level.findOne({name});
        if (existingLevel) {
            return res.status(400).json({ message: "Level with this name already exists" });
        }

        const level = await Level.create({
            name,
            description
        });
        res.status(201).json({message:"Level added successfully", level});
    }catch(error){
        res.status(500).json({message: "Failed adding level", error: error.message});
    }
}

exports.getAllLevels = async(req,res)=>{
    try{
        const levels = await Level.find();

        if (levels.length === 0) {
            return res.status(200).json({ message: "No levels found", levels: [] });
        }
        
        res.status(200).json(levels);
    }catch(error){
        res.status(500).json({message: "Failed to retrieve levels", error: error.message});
    }
}
