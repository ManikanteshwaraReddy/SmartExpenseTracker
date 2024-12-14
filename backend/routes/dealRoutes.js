const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const { getDeals, addDeal } = require('../controllers/dealController');

router.use(auth);

router.get('/', getDeals);
router.post('/', addDeal);

module.exports = router;
