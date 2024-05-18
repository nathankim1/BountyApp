const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Transaction = require('./transaction.model');

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

    currentTransactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }],

    pastTransactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
},
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;