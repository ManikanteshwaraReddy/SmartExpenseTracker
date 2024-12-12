const express = require('express');
const router = express.Router();
const { getExpenses, addExpense } = require('../controllers/expenseController');

router.get('/', getExpenses);
router.post('/', addExpense);

module.exports = router;
