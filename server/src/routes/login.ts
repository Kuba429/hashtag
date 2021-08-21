import express, { response } from "express";
import bcrypt from "bcrypt";

import pool from "../db";
import user from "../UserController";
export const router = express.Router();

router.get("/", (req, res) => {
    req.body.outMessage = "Everything ok";
    req.body.outStatus = "OK";
    //get data from req body
    const { username } = req.body;

    //get hashed password from db

    pool.query("SELECT * FROM users WHERE username LIKE $1;", [username])
        //good query
        .then((response) => {
            const userRow: any = response.rows[0];
            const hashedPassword = userRow.password;
            const givenPassword = req.body.password;

            bcrypt
                .compare(givenPassword, hashedPassword)
                .then((result) => {
                    if (result === true) {
                        // correct password; give token
                        req.body.outMessage = "Good password, logged in";
                    } else {
                        //incorrect password
                        req.body.outMessage = "Incorrect password or username";
                        req.body.outStatus = "Not ok";
                    }
                })
                .catch((err) => {
                    req.body.outStatus = "Not OK1";
                    console.log(err);
                    req.body.outMessage = err;
                })
                .finally(() => {
                    res.json({
                        status: req.body.outStatus,
                        message: req.body.outMessage,
                    });
                });
        })
        //bad query
        .catch((err) => {
            req.body.outStatus = "Not OK2";
            req.body.outMessage = err;
            res.json({
                status: req.body.outStatus,
                message: req.body.outMessage,
            });
        });
});



router.use("/register", user.register);
router.post("/register", async (req, res) => {
    res.json({
        status: req.body.outStatus,
        message: req.body.outMessage,
    });
});
