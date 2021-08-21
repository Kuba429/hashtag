import express, { response } from "express";
import bcrypt from "bcrypt";

import pool from "../db";
import user from "../UserController";
export const router = express.Router();

router.use('/', user.login)
router.get("/", (req, res) => {
    res.json({
        status: req.body.outStatus,
        message: req.body.outMessage,
    });
});



router.use("/register", user.register);
router.post("/register", async (req, res) => {
    res.json({
        status: req.body.outStatus,
        message: req.body.outMessage,
    });
});
