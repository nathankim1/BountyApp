const Transaction = require('../models/transaction.model');

// creates a new transaction from request body
const createTransaction = async (req, res) => {
    if (req.body) {
        const transaction = new Transaction(req.body);
        await transaction.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

// gets all transactions
const getTransactions = async (req, res) => {
    await Transaction.find({})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

module.exports = {
    createTransaction,
    getTransactions,
};