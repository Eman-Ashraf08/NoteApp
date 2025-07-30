"use strict";

const { v2: cloudinary } = require("cloudinary");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const User = require("../models/user.model");
const { Readable } = require("stream");

dotenv.config({ path: "./.env" });

// Multer Configuration
const storage = multer.memoryStorage({
  destination: "./public/temp/uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

module.exports.upload = multer({ storage });

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload File to Cloudinary
module.exports.uploadToCloudinary = async (fileBuffer, fileName) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "temp/uploads", public_id: fileName },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      const readableStream = new Readable();
      readableStream.push(fileBuffer);
      readableStream.push(null);
      readableStream.pipe(stream);
    });

    return result; // This should contain the URL (secure_url)
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};


// Verify JWT Token
module.exports.verifyJWTToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};



// Generate OTP
module.exports.generateOtp = () => {
  return Math.floor(Math.random() * 900000) + 100000; // Generates a 6-digit OTP
};

// Dispatch Email with OTP
module.exports.dispatchAnEmail = async (userEmail) => {
  try {
    const otp = this.generateOtp();

    const transporter = nodemailer.createTransport({
      service: "Gmail", // You can use any email service provider
      auth: {
        user: process.env.EMAIL_USER, // Ensure this is configured in your .env file
        pass: process.env.EMAIL_PASS, // Ensure this is configured in your .env file      
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER, // The email address used for sending
      to: userEmail,
      subject: "OTP Verification",
      text: `Your OTP is: ${otp}`, // Plain text body
    };

    await transporter.sendMail(mailOptions);

    // Update the user's OTP in the database
    await User.updateOne(
      { email: userEmail },
      { otp }
    );

    return { success: true, message: "OTP sent successfully." };
  } catch (error) {
    console.error("Error dispatching email:", error);
    throw error;
  }
};
