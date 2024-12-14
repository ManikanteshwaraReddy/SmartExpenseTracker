const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Other']
  },
  discount: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  expiryDate: {
    type: Date,
    required: true
  },
  vendor: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Deal', DealSchema);
