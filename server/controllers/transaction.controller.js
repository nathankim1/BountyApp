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

// gets a transaction by id
const getTransaction = async (req, res) => {
    if (req.params && req.params.id) {
        await Transaction.findById(req.params.id)
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

// updates a transaction by id
const updateTransaction = async (req, res) => {
    if (req.params && req.params.id) {
        const { id } = req.params;
        const transaction = req.body;
        if (!transaction) {
            return res.status(400).send({ message: 'Data to update can not be empty' });
        }
        await Transaction.findByIdAndUpdate(id, transaction, { new: true })
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

// deletes a transaction by id
const deleteTransaction = async (req, res) => {
    if (req.params && req.params.id) {
        const { id } = req.params;
        await Transaction.findByIdAndDelete(id)
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

module.exports = {
    createTransaction,
    getTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction
};