const { sequelize, User, Avatar } = require('../models');

// AVATAR CRUD
// NEW AVATAR
exports.createAvatar = async(req, res) => {
  const { userUuid, url } = req.body

  try {
    const user = await User.findOne({ where: { uuid: userUuid }})
    const avatar = await Avatar.create({ url, userId: user.id })
    return res.json(avatar)

  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

exports.showAvatars = async(req, res) => {
  const { userUuid, url } = req.body

  try {
    const avatars = await Avatar.findAll({ include: ['user'] })
    return res.json(avatars)

  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
}
