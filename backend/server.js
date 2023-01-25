const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();

// Use helmet for security headers
app.use(cors());
app.use(helmet());

// Connect to MongoDB
require("dotenv").config();
mongoose.set("strictQuery", false); // allows us to use the find() method without passing in an object
const uri = process.env.ATLAS_URI; // uri is the path to our MongoDB database
mongoose.connect(uri);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Use JSON parser
app.use(express.json());