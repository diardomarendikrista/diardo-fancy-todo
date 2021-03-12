const jwt = require('jsonwebtoken');

let secretKey = process.env.JWT_SECRET;

const generateToken = (payload) => {
  return jwt.sign(payload, secretKey);
}

const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
}

module.exports = {
  generateToken,
  verifyToken
}