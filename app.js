
require('dotenv').config();

const express = require("express");
const cors = require("cors");
const { authenticateJWT } = require("./middleware/auth");
const ExpressError = require("./expressError");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const messageRoutes = require("./routes/messages");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public routes
app.use("/auth", authRoutes);

// Protected routes
app.use(authenticateJWT);
app.use("/users", userRoutes);
app.use("/messages", messageRoutes);


/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if (process.env.NODE_ENV != "test") console.error(err.stack);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;
