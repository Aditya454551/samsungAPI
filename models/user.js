const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Username: String, 
    Password: String,
    pwSalt: String,
    token: String
});

const User = mongoose.model('user', userSchema);
module.exports = { User };
