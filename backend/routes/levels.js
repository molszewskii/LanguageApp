const express = require("express");
const router = express.Router();
const levelController = require("../controllers/levelController");

router.post("/createLevel", levelController.createLevel);

module.exports = router;