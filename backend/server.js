require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDb conntection error:", error));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>console.log("Connected to MongoDB")); 

const levelRouter = require("./routes/levels");
const questionRouter = require("./routes/questions");
const userRouter = require("./routes/users");
app.use("/api/levels",levelRouter);
app.use("/api/questions", questionRouter);
app.use("/api/auth",userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))