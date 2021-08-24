//imports
require("dotenv").config();
import cors from "cors";
import express from "express";

import { router as loginRouter } from "./routes/loginRouter";
import { router as postsRouter } from "./routes/postsRouter";

const app = express();

//global middleware
app.use(express.json());
app.use(cors());

//routers
app.use("/login", loginRouter);

app.use("/posts", postsRouter);

app.listen(5000);
