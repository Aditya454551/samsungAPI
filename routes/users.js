const express = require('express');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { User } = require('../models/user'); 

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { Username, Password } = req.body;

        if (!Username || !Password) {
            return res.status(400).json({ error: "Username and Password are required" });
        }

        const salt = crypto.randomBytes(128).toString('base64');
        const hash = crypto.pbkdf2Sync(Password, salt, 10000, 512, 'sha512').toString("hex");

        const resp = await User.create({ Username, Password: hash, pwSalt: salt });

        const payload = {
            userPassword: resp.Password,
            username: resp.Username
        };

        const sendingJwt = jwt.sign(payload, "aditya", { expiresIn: "2hr" });

        return res.status(201).json({ jwt: sendingJwt });
    } catch (err) {
        console.log("Signup Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { Username, Password, token } = req.body;

        if (!token) {
            return res.status(401).json({ error: "Token required for verification" });
        }

        if (!Username || !Password) {
            return res.status(400).json({ error: "Username and Password are required" });
        }

        const user = await User.findOne({ Username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const hash = crypto.pbkdf2Sync(Password, user.pwSalt, 10000, 512, 'sha512').toString("hex");

        if (user.Password !== hash) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        try {
            const decoded = jwt.verify(token, 'aditya');
            return res.status(200).json({ message: "Signin successful", user });
        } catch (err) {
            return res.status(401).json({ message: "JWT is invalid or tempered" });
        }
    } catch (err) {
        console.log("Signin Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { Username, Password } = req.body;

        if (!Username || !Password) {
            return res.status(400).send('Username and Password required');
        }

        const userres = await User.findOne({ Username });

        if (!userres) {
            return res.status(404).send('User not found');
        }

        const hash = crypto.pbkdf2Sync(Password, userres.pwSalt, 10000, 512, 'sha512').toString("hex");

        if (userres.Password === hash) {
            const payload = {
                userPassword: Password,
                username: Username
            };

            const sendingJwt = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5m" });

            return res.status(200).json({ token: sendingJwt });
        } else {
            return res.status(401).send('Not Allowed');
        }
    } catch (err) {
        console.log("Login Error:", err);
        res.status(500).send();
    }
});

router.post('/logout', (req, res) => {
    res.send('User logged out');
});

module.exports = router;
