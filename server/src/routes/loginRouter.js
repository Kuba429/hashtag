const express = require("express");

const pool = require("../db");
const user = require("../UserController");
const router = express.Router();

router.post("/", user.login, (req, res) => {
    const { outStatus, outData, outToken } = req.body;
    
    res.status(outStatus).json({
        data: outData,
        token: outToken,
    });
});

router.post("/register", user.register, (req, res) => {
    const { outStatus, outData } = req.body;
    
    res.status(outStatus).json({
        data: outData,
    });
});


module.exports = router;