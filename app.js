const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const scheduleRoutes = require("./routes/scheduleRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());

app.use("/api/schedule", scheduleRoutes);

module.exports = app;
