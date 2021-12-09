const { sequelize, User, Avatar } = require('../models');

// AVATAR CRUD
// NEW AVATAR
exports.createAvatar = async(req, res) => {
  const { userUuid, url, name, category } = req.body

  try {
    const user = await User.findOne({
      where: { uuid: userUuid }
    })
    const avatar = await Avatar.create({
       url,
       name,
       category,
       userId: user.id
     })
    return res.json(avatar)

  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
}


// INDEX AVATARS
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

// FIND AVATAR
exports.readAvatar = async(req, res) => {
  const uuid = req.params.uuid

  try {
    const avatar = await Avatar.findOne({
      where: { uuid },
      include: ['user']
    })
    return res.json(avatar)

  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

// UPDATE AVATAR
exports.updateAvatar = async(req, res) => {
  const uuid = req.params.uuid
  // const userUuid = req.params.userUuid
  const { name, price, listed, userId } = req.body

  try {
    const avatar = await Avatar.findOne({
      where: { uuid },
      include: ['user']
    })

    avatar.name = name
    avatar.price = price
    avatar.listed = listed
    avatar.userId = userId

    await avatar.save()
    return res.json(avatar)

  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
}
