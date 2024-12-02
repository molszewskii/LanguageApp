const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    description:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500,
    }
});

module.exports = mongoose.model('Level', LevelSchema);