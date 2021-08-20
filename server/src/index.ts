//imports
require("dotenv").config();
import cors from "cors";
import bcrypt from "bcrypt";

import express from "express";
const app = express();
app.use(express.json());
app.use(cors());

import pool from "./db";
//routers

import { router as users } from "./routes/users";

app.use("/users", users);

app.listen(5000);
