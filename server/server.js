const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Transaction = require('./models/transaction.model');
const transactionRoutes = require('./routes/transaction.route');

// middleware
app.use(express.json());

// routes
app.use('/api/transaction', transactionRoutes);

// default route
app.get('/', (req, res) => {
    res.send("Hello from the server side");
});

// mongodb connection + server connection
mongoose.connect(
    "mongodb+srv://capnik:bounty@cluster0.lls5kze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
    console.log("Connected to the database");
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
}).catch((error) => {
    console.log("Connection to databse failed", error);
});