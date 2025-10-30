const express = require('express');
const router = express.Router();
const { getFinancialAdvice } = require('../controllers/aiController');
const auth = require('../middleware/auth');

router.get('/advice', auth, getFinancialAdvice);

module.exports = router;
