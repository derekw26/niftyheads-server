const jwt = require("jsonwebtoken");
const config = require("../config/authConfig.js");
const { sequelize, User } = require('../models');

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.isAdmin) {
      next();
      return;
    }

  res.status(403).send({
    message: "Admin access only!"
  });
    return;
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin
};
module.exports = authJwt;
