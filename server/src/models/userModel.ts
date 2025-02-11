import pool from "../config/db";
import bcrypt from "bcryptjs";

export const createUser = async (
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string
) => {
  // console.log(firstname, lastname, username, email, password);
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [firstname, lastname, username, email, hashedPassword]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};
