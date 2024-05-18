const { User, UserTransaction } = require('../models/user.model');
const bcrypt = require('bcrypt');

// creates user with an unhashed password
const createUser = async (req, res) => {
    if (req.body) {
        const user = new User(req.body);
        await user.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

// gets user by ID
const getUser = async (req, res) => {
    if (req.params && req.params.id) {
        await User.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

// gets all users
const getUsers = async (req, res) => {
    await User.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

// deletes user by ID
const deleteUser = async (req, res) => {
    if (req.params && req.params.id) {
        await User.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const registerUser = async (req, res) => {
    try {
        const {username, password } = req.body;

        // check if user exists
        if (await User.findOne({username})) {
            return res.status(400).send({error: 'User already exists'});
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = new User({username, password: hashedPassword});

        //save user to mongo
        await user.save();
        
        // return user
        res.status(200).send({data: user});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        // check if user exists
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).send({error: 'User does not exist'});
        }

        // check if password is correct
        if (await bcrypt.compare(password, user.password)) {
            res.status(200).send({data: user});
        } else {
            res.status(400).send({error: 'Invalid password'});
        }
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

const newTransactionUser = async (req, res) => {
    try {
        const {username, transactionData} = req.body;

        // check if user exists
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).send({error: 'User does not exist'});
        }

        // create new transaction
        const userTransaction = new UserTransaction(transactionData);

        // add transaction to user's currentTransactions array
        user.currentTransactions.push(userTransaction);
        await user.save();

        res.status(200).send({message: 'Transaction created and added to user', userTransaction, user});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}

module.exports = {
    createUser,
    getUser,
    getUsers,
    deleteUser,
    registerUser,
    loginUser,
    newTransactionUser
}