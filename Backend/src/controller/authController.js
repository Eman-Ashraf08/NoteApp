"use strict";
const express = require("express");
const router = express.Router();
const { httpsCodes } = require("../constants/httpsCodes");
const upload = require("../helper/helper").upload;
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

// verify otp
router.post("/verify-otp", async (req, res, next) => {
  const reqObj = Object.assign({}, req.body);
  authManager
    .verifyOtp(reqObj)
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
