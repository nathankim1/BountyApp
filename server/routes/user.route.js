const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { createUser, getUser, getUsers, deleteUser, registerUser, loginUser, 
    newUserTransaction, getUserTransactions, updateUserTransactions,
    moveUserTransaction, deleteUserTransaction, deleteHistoryTransaction } = require('../controllers/user.controller');

// get users
router.get('/', getUsers);

// get user by id
router.get('/:id', getUser);

// create user
router.post('/', createUser);

// delete user
router.delete('/:id', deleteUser);

// register a new user with hased password
router.post('/register', registerUser);

// login user
router.post('/login', loginUser);

// creates a new transaction for a user
router.post('/transaction', newUserTransaction);

// gets user transactions
router.get('/transaction/:username', getUserTransactions);

// updates user transactions
router.put('/transaction', updateUserTransactions);

// moves user transaction to history transactions
router.put('/transaction/move', moveUserTransaction);

// deletes user transaction
router.delete('/transaction/:username/:id', deleteUserTransaction);

//deletes history transaction
router.delete('/transaction/history/:username/:id', deleteHistoryTransaction);

module.exports = router;