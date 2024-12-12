const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  discountPercentage: { type: Number, required: true },
});

module.exports = mongoose.model('Deal', DealSchema);
