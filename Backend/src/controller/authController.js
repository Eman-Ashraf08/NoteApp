"use strict";
const express = require("express");
const router = express.Router();
const { httpsCodes } = require("../constants/httpsCodes");
const authManager = require("../manager/authManager");

router.post("/signup", async (req, res) => {
  const reqObj = { ...req.body };

  try {
    const result = await authManager.createUser(reqObj);
    const statusCode = result?.status || httpsCodes.SUCCESS_CODE;
    res.status(statusCode).json(result);
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(httpsCodes.SERVER_ERROR_CODE).json({
      error: "Failed to create user",
      details: error.message || error,
    });
  }
});
// Login api
router.post("/login", async (req, res) => {
  const reqObj = { ...req.body };
  try {
    const result = await authManager.login(reqObj);
    const statusCode = result?.status || httpsCodes.SUCCESS_CODE;
    res.status(statusCode).json(result);
  } catch (error) {
    console.error("Login Error:", error);
    res.status(httpsCodes.SERVER_ERROR_CODE).json({
      error: "Failed to log in",
      details: error.message || error,
    });
  }
});
// get user
router.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id; // Extract user ID from route parameters
    if (!userId) {
      return res.status(400).json({
        status: httpsCodes.BAD_REQUEST,
        message: "User ID is required.",
      });
    }

    const result = await authManager.getUser(userId);
    res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    res.status(httpsCodes.SERVER_ERROR_CODE).json({
      error: error.message || "Internal Server Error",
    });
  }
});

// verify-email
router.post("/verify-email", async (req, res, next) => {
  const reqObj = Object.assign({}, req.body);
  authManager
    .verifyEmail(reqObj)
    .then(async (result) => {
      res.status(result.status).json(result);
    })
    .catch(async (error) => {
      console.log(error);
      res.send({
        error: error,
        status: httpsCodes.SERVER_ERROR_CODE,
      });
    });
});

module.exports = router;
