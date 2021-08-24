import express from "express";
import pool from "../db";
import user from "../UserController";
export const router = express.Router();

router.get("/", user.login, (req, res) => {
    res.json({
        status: req.body.outStatus,
        message: req.body.outMessage,
        token: req.body.outToken,
    });
});

router.post("/register", user.register, (req, res) => {
    res.json({
        status: req.body.outStatus,
        message: req.body.outMessage,
    });
});

