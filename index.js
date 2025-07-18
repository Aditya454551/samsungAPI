const mongoose = require("mongoose");
const express = require('express');
const port = 3000;

const app = express();
app.use(express.json());

const usersRouter = require('./routes/users');
const samsungRouter = require('./routes/samsungs');
const { samsungMiddleware } = require("./middlewares");

app.use('/samsungs', samsungMiddleware);   
app.use('/users', usersRouter);       
app.use('/samsungs', samsungRouter);   

app.listen(port, async () => {
    try {
        console.log("env",process.env.DB_URL)
        await mongoose.connect(`${process.env.DB_URL}`);
        console.log(`Server running on port ${port}`);
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
});
