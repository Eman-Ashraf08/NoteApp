"use strict";

const { httpsCodes } = require("../constants/httpsCodes");
const { language } = require("../constants/language");
const User = require("../models/user.model");
const { dispatchAnEmail } = require("../helper/helper");
const { generateAccessToken, generateRefreshToken } = require("../helper/jwtToken");
const bcrypt = require("bcrypt");

class AuthManager {
  static async createUser(reqObj) {
    try {
      let result = {};
      const existUser = await User.findOne({ email: reqObj.email });
      if (existUser) {
        return (result = {
          status: httpsCodes.CONFLICT,
          message: language.USER_ALREADY_EXISTS,
        });
      }
      const newUser = new User(reqObj);
      const savedUser = await newUser.save();

      result = {
        status: httpsCodes.SUCCESS_CODE,
        message: language.ONE_RECORD_CREATE,
        result: {
          user: savedUser,
        },
      };
      return result;
    } catch (error) {
      return error;
    }
  }

  static async getUser(userId) {
    try {
      const userData = await User.findById(userId);
      if (!userData) {
        return {
          status: httpsCodes.NOT_FOUND,
          message: language.RECORD_NOT_FOUND,
        };
      }
      return {
        status: httpsCodes.SUCCESS_CODE,
        message: language.RECORD_FOUND,
        user: userData,
      };
    } catch (error) {
      console.error("Error in AuthManager.getUser:", error);
      throw error;
    }
  }
  static async login(reqObj) {
    try {
      const { email, password } = reqObj;
      let user;
      if (email) {
        user = await User.findOne({ email: email });
      }
      if (!user) {
        return {
          status: httpsCodes.NOT_FOUND,
          message: language.NOT_REGISTER,
        };
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return {
          status: httpsCodes.UNAUTHORIZE_CODE,
          errorCode: "WRONG_PASSWORD",
          message: language.WRONG_PASSWORD,
        };
      }
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      return {
        status: httpsCodes.SUCCESS_CODE,
        message: language.RECORD_FOUND,
        result: {
          user,
          accessToken,
          refreshToken,
        },
      };
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
  static async verifyEmail(reqObj) {
    try {
      let result = {};
      const user = await User.findOne({
        email: reqObj.email,
      });

      if (!user) {
        result = {
          status: httpsCodes.NOT_FOUND,
          message: language.NOT_FOUND,
        };
      } else {
        await user.save();
        await dispatchAnEmail(reqObj.email);
        result = {
          status: httpsCodes.SUCCESS_CODE,
          message: "Otp sent successfully",
        };
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthManager;
