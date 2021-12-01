"use strict";
const express = require("express"); //Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. APIs.
const path = require("path"); //The Path module provides a way of working with directories and file paths.
require("dotenv").config(); //this is required to load environment variable from .env file
const app = express(); //creating an instance of express app
const router = express.Router(); //creating an instance of a express.Router()

app.use(express.json()); //The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.static(path.join(__dirname, "build")));
//The path.join() method joins the specified path segments into one path. Have Node serve the files for our built React app

// default URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "/index.html"));
});

// Handle GET requests to /api route
app.get("/api/v1/pantheon", (req, res) => {
  res.json({ status: 200, message: "API is running" });
});

router.get("/health", (req, res) => {
  const healthcheck = {
    status: 200,
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    res.json(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.json({ status: "503", message: healthcheck });
  }
});

app.use("/api/v1/pantheon", router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});