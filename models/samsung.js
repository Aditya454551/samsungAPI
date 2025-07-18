const mongoose = require('mongoose');

const samsungSchema = new mongoose.Schema({
    pro_id: String,
    name: String,
    price: Number
});

const Samsung = mongoose.model('samsungs', samsungSchema);
module.exports = { Samsung };
