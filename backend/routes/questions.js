const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController")

router.post("/createQuestion", questionController.createQuestion);
router.get("/getQuestionsByLevel/:levelId", questionController.getQuestionsByLevel);
router.get("/getAllQuestions", questionController.getAllQuestions);
router.get("/getQuestionById/:id", questionController.getQuestionById);
module.exports = router;