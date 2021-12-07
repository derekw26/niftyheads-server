const { sequelize, Sequelize, User, Avatar } = require('../models');
const config = require("../config/authConfig");

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

// REGISTER USER
exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 6),
    isAdmin: false
  })
  .then(() => {
    res.send({ message: "User was registered successfully!" });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

// SIGN IN USER
exports.signin = async (req, res) => {
  await User.findOne({
    where: {
      username: req.body.username
    },
    include: 'avatars'
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    let passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
      isAdmin: user.isAdmin,
      avatars: user.avatars
    });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};
