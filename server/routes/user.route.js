const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { createUser, getUser, getUsers, deleteUser, registerUser, loginUser, 
    newTransactionUser } = require('../controllers/user.controller');

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
router.post('/transaction', newTransactionUser);

module.exports = router;