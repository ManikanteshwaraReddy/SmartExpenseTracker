const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const query = { user: req.user.id };

    if (start_date && end_date) {
      query.date = {
        $gte: new Date(start_date),
        $lte: new Date(end_date),
      };
    } else if (start_date) {
      query.date = { $gte: new Date(start_date) };
    } else if (end_date) {
      query.date = { $lte: new Date(end_date) };
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
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
    const { amount, description, category, isRecurring, date } = req.body;
    const expenseDate = date ? new Date(date) : new Date();

    const newExpense = new Expense({
      user: req.user.id,
      amount,
      description,
      category,
      date: expenseDate,
      isRecurring: isRecurring || false,
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
