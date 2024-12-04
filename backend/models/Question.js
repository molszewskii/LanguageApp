const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
        enum: ['translation','fill-in','choose-word','multiple-choice']
    },
    content: {
        type: String,
        required: true,
    },
    correctAnswer:{
        type: String,
        required: true,
    },
    options:[String],
    level:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level',
        required: true,
    }
})

module.exports = mongoose.model('Question', QuestionSchema);