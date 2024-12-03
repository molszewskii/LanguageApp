const express = require("express");
const router = express.Router();
const levelController = require("../controllers/levelController");

router.post("/createLevel", levelController.createLevel);
router.get("/getAllLevels", levelController.getAllLevels);
router.get("/getLevelById/:id", levelController.getLevelById);
module.exports = router;