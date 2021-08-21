import express from "express";

import user from "../UserController";
export const router = express.Router();

// router.use('/', user.login)
router.get("/", user.login, (req, res) => {
    res.json({
        status: req.body.outStatus,
        message: req.body.outMessage,
        token: req.body.outToken,
    });
});

// router.use("/register", user.register);
router.post("/register", user.register, (req, res) => {
    res.json({
        status: req.body.outStatus,
        message: req.body.outMessage,
    });
});
