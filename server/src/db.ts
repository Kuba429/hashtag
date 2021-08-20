import { Pool } from "pg";
require("dotenv").config();

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: parseInt(<string>process.env.PGPORT),
});

export default pool;
