import express from "express";
import post from "../PostController";
export const router = express.Router();

router.get("/get", post.getPosts, (req, res) => {
    const { outStatus, outData } = req.body;
    res.status(outStatus).json({ data: outData });
});

router.post("/add", post.add, (req, res) => {
    const { outStatus, outData } = req.body;
    res.status(outStatus).json({ data: outData });
});
