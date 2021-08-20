import express, { response } from "express";
import bcrypt from "bcrypt";

import pool from "../db";
export const router = express.Router();

router.get("/", (req, res) => {
    res.json("login page");
});

router.post("/register", async (req, res) => {
    req.body.outMessage = "Fine";
    req.body.outStatus = "OK";
    const saltRound = parseInt(<string>process.env.SALTROUNDS);
    const { username, password } = req.body;

    bcrypt.hash(password, saltRound, function (err, hash) {
        if (err) {
            req.body.outMessage = "ERROR";
            req.body.outStatus = "Not OK";
            res.json({
                message: req.body.outMessage,
                status: req.body.outStatus,
            });
        }

        pool.query(
            "INSERT INTO users(username,password, created_on)\
             VALUES($1,$2, CURRENT_TIMESTAMP)",
            [username, hash]
        )
            .then((response) => {
                req.body.outMessage = response;
            })
            .catch((err) => {
                req.body.outStatus = "Not OK";
                req.body.outMessage = err;
            })
            .finally(() => {
                res.json({
                    status: req.body.outStatus,
                    message: req.body.outMessage,
                });
            });
    });
});
