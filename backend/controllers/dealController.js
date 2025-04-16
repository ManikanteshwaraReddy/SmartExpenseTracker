const Deal = require('../models/Deal');
const Expense = require('../models/Expense');
const mlHelper = require('../utils/mlHelper');

exports.getDeals = async (req, res) => {
  try {
    // Get user's expenses
    const userExpenses = await Expense.find({ user: req.user.id });

    // Use ML model to predict relevant categories
    const recommendedCategories = mlHelper.predictDeals(userExpenses);

    // Find relevant deals based on recommended categories
    const deals = await Deal.find({
      category: { $in: recommendedCategories },
      expiryDate: { $gt: new Date() },
    });


    res.json(deals);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching deals',
      error: error.message 
    });
  }
};

exports.addDeal = async (req, res) => {
  try {
    const { title, description, category, discount, expiryDate, vendor } = req.body;
    
    const newDeal = new Deal({
      title,
      description,
      category,
      discount,
      expiryDate,
      vendor
    });

    const savedDeal = await newDeal.save();
    res.status(201).json(savedDeal);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error adding deal',
      error: error.message 
    });
  }
};
