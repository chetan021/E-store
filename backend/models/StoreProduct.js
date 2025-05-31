const mongoose = require('mongoose');

const storeProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'StoreOwner' },
});

module.exports = mongoose.model('StoreProduct', storeProductSchema);
