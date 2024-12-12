const express = require('express');
const router = express.Router();
const { getDeals, addDeal } = require('../controllers/dealController');

router.get('/', getDeals);
router.post('/', addDeal);

module.exports = router;
