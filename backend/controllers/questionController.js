const Level = require("../models/Level");
const Question = require("../models/Question");

exports.createQuestion = async(req,res)=>{
    const {type, content, correctAnswer, options, levelId} = req.body;

    if(!type || !content || !correctAnswer || !options || !levelId){
        return res.status(400).json({message: "Missing required data"})
    }

    try{
        const level = await Level.findById(levelId);
        if(!level){
            return res.status(404).json({message: "Level doesn't exist"})
        }

        const newQuestion = new Question({
            type,
            content,
            correctAnswer,
            options: options || [],
            level: levelId,
        });
        await newQuestion.save();
        res.status(201).json({messgae: "Question added successfully!", question: newQuestion});
    }catch(error){
        res.status(500).json({message: "Failed adding the question", error: error.message});
    }
}