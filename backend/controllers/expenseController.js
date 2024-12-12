const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const newExpense = new Expense({
      amount,
      description,
      category,
      user: req.user.id,
    });
    const expense = await newExpense.save();
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
