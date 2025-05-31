const mongoose = require('mongoose');

const storeOwnerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

module.exports = mongoose.model('StoreOwner', storeOwnerSchema);
