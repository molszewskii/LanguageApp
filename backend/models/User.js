const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        minlength: 3,
        maxlength: 20,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    solvedLevels: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level',
    }
},{timestamps: true})

module.exports = mongoose.model('User', UserSchema);