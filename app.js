const express = require('express');

const { sequelize, User, Avatar } = require('./models');

const app = express();
app.use(express.json());

// USER CRUD
// NEW USER
app.post('/users', async(req, res) => {
  const { name, email } = req.body

  try {
    const user = await User.create({ name, email })
    return res.json(user)
  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

// INDEX USERS
app.get('/users', async(req, res) => {
  try {
    const users = await User.findAll()

    return res.json(users)
  } catch(err) {
    console.log(err)
    return res.status(500).json({ err: 'Something went wrong!' })
  }
})

// FIND USER
app.get('/users/:uuid', async(req, res) => {
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
})

// UPDATE USER
app.put('/users/:uuid', async(req, res) => {
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
})

// DELETE USER
app.delete('/users/:uuid', async(req, res) => {
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
})


// AVATARS
app.post('/avatars', async(req, res) => {
  const { userUuid, url } = req.body

  try {
    const user = await User.findOne({ where: { uuid: userUuid }})

    const avatar = await Avatar.create({ url, userId: user.id })

    return res.json(avatar)

  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

app.get('/avatars', async(req, res) => {
  const { userUuid, url } = req.body

  try {
    const avatars = await Avatar.findAll({ include: ['user'] })

    return res.json(avatars)

  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
})


app.listen({ port: 5000 }, async() => {
    console.log('Server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log('Database connected!')
})
