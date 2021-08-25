import express from "express";
import pool from "../db";
import user from "../UserController";
export const router = express.Router();

router.get("/", user.login, (req, res) => {
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
