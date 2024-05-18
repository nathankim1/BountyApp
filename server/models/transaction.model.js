const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name of transaction is required"]
    },

    date: {
        type: Date,
        required: [true, "Date of transaction is required"]
    },

    amount: {
        type: Number,
        required: [true, "Amount of transaction is required"]
    },

    amountLeft: {
        type: Number,
        required: false
    },

    peopleOwed: [{
        name: {
            type: String,
            required: false,
            unique: true
        },

        amount: {
            type: Number,
            required: false
        }
    }]
},
    {
        timestamps: true
    }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;