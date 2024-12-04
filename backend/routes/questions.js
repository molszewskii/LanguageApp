const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController")

router.post("/createQuestion", questionController.createQuestion);

module.exports = router;