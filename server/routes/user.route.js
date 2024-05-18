const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { createUser, getUser, getUsers, deleteUser } = require('../controllers/user.controller');

// get users
router.get('/', getUsers);

// get user by id
router.get('/:id', getUser);

// create user
router.post('/', createUser);

// delete user
router.delete('/:id', deleteUser);

module.exports = router;