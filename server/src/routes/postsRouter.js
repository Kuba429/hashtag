const express = require("express");
const post = require("../PostController");
const router = express.Router();

router.post("/get", post.getPosts, (req, res) => {
    const { outStatus, outData } = req.body;
    res.status(outStatus).json(outData);
});
//Cannot POST /posts/userPosts - fix!!!
router.post("/userPosts;", post.getUsersPosts, (req, res) => {
    const { outStatus, outData } = req.body;
    res.status(outStatus).json(outData);
});

router.post("/add", post.add, (req, res) => {
    const { outStatus, outData } = req.body;
    res.status(outStatus).json({ data: outData });
});

router.post("/delete", post.delete, (req, res) => {
    const { outStatus, outData } = req.body;
    res.status(outStatus).json({ data: outData });
});

router.get("/popularTags/:howMany", post.getPopularTags, (req, res) => {
    const { outStatus, outData } = req.body;
    res.status(outStatus).json({ data: outData });
});

module.exports = router;
