const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  asin: String,
  title: String,
  image: String,
  price: String,
  quantity: {
    type: Number,
    default: 1
  }
});

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  cart: [cartItemSchema]
});

module.exports = mongoose.model('User', userSchema);
