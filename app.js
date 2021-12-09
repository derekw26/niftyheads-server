const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, User, Avatar } = require('./models');

require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)

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

app.post('/payment', cors(), async(req, res) => {

  let {amount, id} = req.body

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'AUD',
      description: 'Niftyheads',
      payment_method: id,
      confirm: true
    })

    console.log('Payment', payment)

    res.json( {
      message: 'payment successful',
      success: true
    })

  } catch (error) {
    console.log('Error', error)
    res.json( {
      message: 'payment failed',
      success: false
    })
  }
})

// SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, async() => {
    console.log(`Server up on port ${ PORT }`)
    await sequelize.authenticate()
    console.log('Database connected!')
})
