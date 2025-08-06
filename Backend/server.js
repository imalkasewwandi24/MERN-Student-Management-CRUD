const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const URL = process.env.MONGO_URL;

mongoose.connect(URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));


const studentRouter = require("./routes/students");
app.use("/student", studentRouter);




  // Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
