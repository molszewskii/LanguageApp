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