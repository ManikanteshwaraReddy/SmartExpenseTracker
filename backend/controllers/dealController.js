const Deal = require('../models/Deal');
const Expense = require('../models/Expense');

exports.getDeals = async (req, res) => {
  try {
    // Get user's expense categories
    const userCategories = await Expense.distinct('category', { 
      user: req.user.id 
    });

    // Find relevant deals based on user's spending categories
    const deals = await Deal.find({
      category: { $in: userCategories },
      expiryDate: { $gt: new Date() }
    }).sort({ expiryDate: 1 });

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
