const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction.model');
const { createTransaction, getTransactions } = require('../controllers/transaction.controller');

// get transactions
router.get('/', getTransactions);

// create transaction
router.post('/create', createTransaction);

module.exports = router;