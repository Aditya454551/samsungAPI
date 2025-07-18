const express = require('express');
const jwt = require("jsonwebtoken");
const { Samsung } = require('../models/samsung');  
const router = express.Router();

router.post('/', async (req, res) => {
    const { pro_id, name, price } = req.body;

    if (price >= 5000) {
        const resp = await Samsung.create({ pro_id, name, price });
        return res.status(201).json(resp);
    } else {
        return res.status(500).json({ error: "Price is too cheap" });
    }
});

router.get("/filtered", async (req, res) => {
    const samsung = await Samsung.find({ price: { $lte: 5000 } });
    return res.status(200).json(samsung);
});

router.get("/", async (req, res) => {
    const samsung = await Samsung.find();
    return res.status(200).json(samsung);
});

module.exports = router;
