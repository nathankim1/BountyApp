const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new mongoose.Schema({
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
            required: false
        },
        amount: {
            type: Number,
            required: false
        }
    }]
}, { _id: false });

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Name of user is required"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "Password of user is required"]
    },

    currentTransactions: [TransactionSchema],

    pastTransactions: [TransactionSchema]
},
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;