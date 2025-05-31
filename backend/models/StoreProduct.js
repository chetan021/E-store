// models/StoreProduct.js
const mongoose = require('mongoose');

const storeProductSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'StoreOwner', required: true },
  name: { type: String, required: true },
  description: String,
  quantity: Number,
  category: String,
  brand: String,
  tags: [String],
  price: Number,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('StoreProduct', storeProductSchema);
