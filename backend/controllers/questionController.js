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

exports.getQuestionsByLevel = async (req, res) => {
    const { levelId } = req.params;

    try {
        const questions = await Question.find({ level: levelId });
        if (!questions.length) {
            return res.status(404).json({ message: "No questions found for this level" });
        }
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch questions", error: error.message });
    }
};

exports.getAllQuestions = async(req,res)=>{
    try{
        const questions = await Question.find();
        if(!questions){
            return res.status(404).json({message: "Questions not found"});
        }
        res.status(200).json(questions);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.getQuestionById = async (req, res) => {
    const { id } = req.params;

    try {
        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch question", error: error.message });
    }
};

exports.deleteQuestion = async(req,res)=>{
    try{
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.json({message:"Question deleted successfully"});
    }catch(error){
        res.status(500).json({message: "Failed to delete question", error: error.message})
    }
}

exports.updateQuestion = async(req,res)=>{
    try{
        const question = await Question.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true,
        })
        if(!question){
            return res.status(404).json({message:"Question not found"});
        }
        res.status(200).json({message: "Question updated successfully"});
    }catch(error){
        res.status(500).json({message: "Failed to update question", error: error.message});
    }
}