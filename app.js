const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, User, Avatar } = require('./models');

const avatarRoutes = require('./routes/avatarRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');



const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

avatarRoutes(app);
userRoutes(app);
authRoutes(app);

app.get('/', (req, res) => {
  res.json({
    message: 'This message is from the server'
  })
})

// SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, async() => {
    console.log(`Server up on port ${ PORT }`)
    await sequelize.authenticate()
    console.log('Database connected!')
})
