import express from "express";
import post from "../PostController";
export const router = express.Router();

router.post("/add", post.add, (req, res) => {
    res.json({
        status: req.body.outStatus,
        message: req.body.outMessage,
    });
});
