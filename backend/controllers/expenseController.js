const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id })
      .sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching expenses',
      error: error.message 
    });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    
    const newExpense = new Expense({
      user: req.user.id,
      amount,
      description,
      category,
      date: new Date()
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error adding expense',
      error: error.message 
    });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(expense);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error updating expense',
      error: error.message 
    });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting expense',
      error: error.message 
    });
  }
};
