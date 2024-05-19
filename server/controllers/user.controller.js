const { User, UserTransaction } = require("../models/user.model");
const bcrypt = require("bcrypt");

// creates user with an unhashed password
const createUser = async (req, res) => {
  if (req.body) {
    const user = new User(req.body);
    await user
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

// gets user by ID
const getUser = async (req, res) => {
  if (req.params && req.params.id) {
    await User.findById(req.params.id)
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

// gets all users
const getUsers = async (req, res) => {
  await User.find({})
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

// deletes user by ID
const deleteUser = async (req, res) => {
  if (req.params && req.params.id) {
    await User.findByIdAndDelete(req.params.id)
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if user exists
    if (await User.findOne({ username })) {
      return res.status(400).send({ error: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = new User({ username, password: hashedPassword });

    //save user to mongo
    await user.save();

    // return user
    res.status(200).send({ data: user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }

    // check if password is correct
    if (await bcrypt.compare(password, user.password)) {
      res.status(200).send({ data: user });
    } else {
      res.status(400).send({ error: "Invalid password" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const newUserTransaction = async (req, res) => {
  try {
    const { username, transactionData } = req.body;

    // check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }

    // create new transaction
    const userTransaction = new UserTransaction(transactionData);

    // add transaction to user's currentTransactions array
    user.currentTransactions.push(userTransaction);
    await user.save();

    res
      .status(200)
      .send({
        message: "Transaction created and added to user",
        userTransaction,
        user,
      });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getUserTransactions = async (req, res) => {
  try {
    // check if user exists
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }

    res.status(200).send({ data: user.currentTransactions });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateUserTransactions = async (req, res) => {
  try {
    const { username, transactionData } = req.body;

    // check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }

    // find transaction in currentTransactions array
    const transaction = user.currentTransactions.id(transactionData._id);
    if (!transaction) {
      return res.status(400).send({ error: "Transaction does not exist" });
    }

    // update transaction
    transaction.set(transactionData);
    await user.save();

    res.status(200).send({ message: "Transaction updated", user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const moveUserTransaction = async (req, res) => {
  try {
    const { username, transactionId } = req.body;

    // check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }

    // find transaction in currentTransactions array
    const transaction = user.currentTransactions.id(transactionId);
    if (!transaction) {
      return res.status(400).send({ error: "Transaction does not exist" });
    }

    // move transaction to historyTransactions array
    user.historyTransactions.push(transaction);
    user.currentTransactions.pull(transaction);
    await user.save();

    res.status(200).send({ message: "Transaction moved to history", user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteUserTransaction = async (req, res) => {
  try {
    // check if user exists
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }

    // find the transaction to delete
    const transactionIndex = user.currentTransactions.findIndex(
      (transaction) => transaction._id.toString() === req.params.id
    );
    if (transactionIndex === -1) {
      return res.status(400).send({ error: "Transaction does not exist" });
    }

    // remove the transaction
    user.currentTransactions.splice(transactionIndex, 1);
    await user.save();

    res.status(200).send({ data: user.currentTransactions });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteHistoryTransaction = async (req, res) => {
  try {
    // check if user exists
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }

    // find the transaction to delete
    const transactionIndex = user.historyTransactions.findIndex(
      (transaction) => transaction._id.toString() === req.params.id
    );
    if (transactionIndex === -1) {
      return res.status(400).send({ error: "Transaction does not exist" });
    }

    // remove the transaction
    user.historyTransactions.splice(transactionIndex, 1);
    await user.save();

    res.status(200).send({ data: user.currentTransactions });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  registerUser,
  loginUser,
  newUserTransaction,
  getUserTransactions,
  updateUserTransactions,
  moveUserTransaction,
  deleteUserTransaction,
  deleteHistoryTransaction,
};
