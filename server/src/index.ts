//imports
require("dotenv").config();
import cors from "cors";
import express from "express";

import { router as login } from "./routes/login";

const app = express();

//global middleware
app.use(express.json());
app.use(cors());

//routers
app.use("/login", login);

app.listen(5000);
