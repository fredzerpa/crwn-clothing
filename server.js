const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.post('/payment', (req, res) => {
  const { token, amount } = req.body;
  const body = {
    source: token.id,
    amount: amount,
    currency: 'usd',
  };
  
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'build', 'service-worker.js')); 
})

app.listen(port, error => {
  if (error) throw new Error(error);
  console.log(`Server running on PORT: ${port}`);
});
