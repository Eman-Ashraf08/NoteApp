
const jwt = require('jsonwebtoken')
const generateAccessToken = (userData) => {
  const payLoad = {
    id: userData._id,
    name: userData.name,
    email: userData.email,
  };

  return jwt.sign(payLoad, process.env.JWT_SECRET_KEY, { expiresIn: "48h" });
};

const generateRefreshToken = (userData) => {
  const payLoad = {
    id: userData._id,
    name: userData.name,
    email: userData.email,
  };

  return jwt.sign(payLoad, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
};

module.exports = { generateAccessToken, generateRefreshToken };