const Deal = require('../models/Deal');

exports.getDeals = async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.addDeal = async (req, res) => {
  try {
    const { title, description, category, expiryDate, discountPercentage } = req.body;
    const newDeal = new Deal({
      title,
      description,
      category,
      expiryDate,
      discountPercentage,
    });
    const deal = await newDeal.save();
    res.json(deal);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
