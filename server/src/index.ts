import cors from "cors";
import express from "express";
import bcrypt from "bcrypt";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
    res.json("eloelo320");
});

app.listen(5000);
