const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController")

router.post("/createQuestion", questionController.createQuestion);
router.get("/getQuestionsByLevel/:levelId", questionController.getQuestionsByLevel);
module.exports = router;