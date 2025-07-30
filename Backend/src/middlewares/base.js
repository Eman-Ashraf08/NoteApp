"use strict";
const express = require("express");
const { unless } = require("express-unless");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { verifyJWTToken } = require("../helper/helper");
const { httpsCodes } = require("../constants/httpsCodes");
const { language } = require("../constants/language");
const  unlessRoutes  = require("../config/unlessRoutes");

class Base {
  constructor() {}

  static init(app) {
    app.use(
      session({
        secret: "your-secret-key",
        resave: false,
        saveUninitialized: false,
      })
    );
    app.use(bodyParser.json({ limit: "5mb" }));
    app.use(bodyParser.urlencoded({ limit: "5mb", extended: false }));
    app.use(cookieParser());
    app.use(express.static("public"));

    // Logging middleware
    app.use((req, res, next) => {
      console.log('Request Detail ====> ', {
        Url: req.originalUrl,
        Body: req.body,
        Param: req.params,
        Query: req.query,
      });
      next();
    });

    // CORS middleware
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });

    // Authentication middleware
    Base.authenticate.unless = unless;
    app.use(Base.authenticate.unless(unlessRoutes));
  }

  static async authenticate(req, res, next) {
    const token = req?.headers?.accesstoken;
    console.log(token)
    if (token) {
      const result = await verifyJWTToken(token);
      if (result.err) {
        res.status(httpsCodes.UNAUTHORIZE_CODE).json({
          status: httpsCodes.UNAUTHORIZE_CODE,
          message: language.INVALID_AUTH_TOKEN,
        });
      } else {
        req.user = result.decoded;
        next();
      }
    } else {
      res.status(httpsCodes.UNAUTHORIZE_CODE).json({ message: language.NO_AUTH_GIVEN });
    }
  }
}

module.exports = Base;
