import { Request, Response } from "express";
import { createUser, findUserByEmail } from "../models/userModel";
import { generateToken } from "../utils/jwtUtils";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await createUser(username, email, password);
    const token = generateToken(user.id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error, msg: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user.id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error, msg: "Login failed" });
  }
};
