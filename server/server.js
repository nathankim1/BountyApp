const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const transactionRoutes = require("./routes/transaction.route");
const userRoutes = require("./routes/user.route");
const cors = require("cors");
require('dotenv').config();

// enable all CORS request
app.use(cors());

// middleware
app.use(express.json());

// routes
//app.use('/api/transaction', transactionRoutes);
app.use("/api/user", userRoutes);

// default route
app.get("/", (req, res) => {
  res.send("Hello from the server side");
});

const port = process.env.PORT || 3000;

// mongodb connection + server connection
mongoose
  .connect(
    process.env.MONGODB
  )
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  })
  .catch((error) => {
    console.log("Connection to database failed", error);
  });
