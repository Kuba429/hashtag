//imports
require("dotenv").config();
const cors = require("cors");
const express = require("express");

const loginRouter = require("./routes/loginRouter");
const postsRouter = require("./routes/postsRouter");

const app = express();

//global middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    //defaulting outgoing data
    req.body.outData = "Blank";
    req.body.outStatus = 200;
    next();
});
//routers
app.use("/login", loginRouter);

app.use("/posts", postsRouter);

app.listen(5000);
