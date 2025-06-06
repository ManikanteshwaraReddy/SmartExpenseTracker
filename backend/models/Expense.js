const mongoose = require('mongoose');

const isValidDate = (date) => {
  return !isNaN(new Date(date).getTime());
};


const ExpenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Shopping', 'Other']
  },
  date: {
    type: Date,
    default: Date.now,
    validate: {
      validator: isValidDate,
      message: 'Invalid date format',
    },
  },
  isRecurring: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Expense', ExpenseSchema);
