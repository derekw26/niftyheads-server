const { sequelize, User, Avatar } = require('../models');

// NEW USER
exports.createUser = async(req, res) => {
  const { username, email, password } = req.body

  try {
    const user = await User.create({ username, email, password })
    return res.json(user)

  } catch(err) {
    console.log(err)
    return res.status(500).json({ err: 'Something went wrong!' })
  }
}

// INDEX USERS
exports.showUsers = async(req, res) => {
  try {
    const users = await User.findAll()
    return res.json(users)

  } catch(err) {
    console.log(err)
    return res.status(500).json({ err: 'Something went wrong!' })
  }
}

// FIND USER
exports.readUser = async(req, res) => {
  const uuid = req.params.uuid

  try {
    const user = await User.findOne({
      where : { uuid },
      include: 'avatars'
    })
    return res.json(user)

  } catch(err) {
    console.log(err)
    return res.status(500).json({ err: 'Something went wrong!' })
  }
}

// UPDATE USER
exports.updateUser = async(req, res) => {
  const uuid = req.params.uuid
  const { name, email } = req.body

  try {
    const user = await User.findOne({
      where : { uuid }
    })

    user.name = name
    user.email = email

    await user.save()
    return res.json(user)

  } catch(err) {
    console.log(err)
    return res.status(500).json({ err: 'Something went wrong!' })
  }
}

// DELETE USER
exports.deleteUser = async(req, res) => {
  const uuid = req.params.uuid
  try {
    const user = await User.findOne({
      where : { uuid }
    })

    await user.destroy()
    return res.json({ message: 'User deleted!'})

  } catch(err) {
    console.log(err)
    return res.status(500).json({ err: 'Something went wrong!' })
  }
}

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
