import express from "express";

export const router = express.Router();

router.get("/login", (req, res) => {
    res.json("login page");
});

router.get("/register", (req, res) => {
    res.json("register page");
});
