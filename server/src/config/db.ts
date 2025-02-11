import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();
const pool = new Pool({
  user: process.env.PG_DB_USER,
  host: process.env.PG_DB_HOST,
  database: process.env.PG_DB_NAME,
  password: process.env.PG_DB_PASSWORD,
  port: parseInt(process.env.PG_DB_PORT || "5432"),
});

export default pool;
