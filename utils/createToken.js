

const jwt = require('jsonwebtoken');

const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EPIREIN
  });

module.exports = createToken;