const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction.model');
const { createTransaction, getTransactions, getTransaction, updateTransaction, deleteTransaction } = require('../controllers/transaction.controller');

// get transactions
router.get('/', getTransactions);

router.get('/:id', getTransaction);

// create transaction
router.post('/', createTransaction);

// update transaction
router.put('/:id', updateTransaction);

// delete transaction
router.delete('/:id', deleteTransaction);

module.exports = router;