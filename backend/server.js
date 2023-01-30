const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");

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

// User model
const User = require("./models/user.model");

// Secret key for JWT
const secret = "mysecretkey";

// Login route
app.post("/login", (req, res) => {
  // Find the user with the given email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(404).send({ message: "User not found" });
    } else {
      // Compare the given password with the hashed password in the database
      bcrypt.compare(req.body.password, user.password, (err, match) => {
        if (err) {
          res.status(500).send(err);
        } else if (!match) {
          res.status(401).send({ message: "Invalid password" });
        } else {
          // Create and sign a JWT
          const token = jwt.sign({ user }, secret, { expiresIn: "100h" });

          // Send the JWT in the response
          res.json({ token });
        }
      });
    }
  });
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/img/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      message: "No file received",
      success: false,
    });
  } else {
    return res.send({
      message: "File received",
      success: true,
    });
  }
});

// API routes
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const productsRouter = require("./routes/products");
app.use("/product", authenticateJWT, productsRouter);

// Start server
const port = process.env.PORT || 5000; // port number is set to 5000 if there isn't a preconfigured port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
