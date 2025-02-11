import { Request, Response } from "express";
import { createUser, findUserByEmail } from "../models/userModel";
import { generateToken } from "../utils/jwtUtils";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, username, email, password } = req.body;
  // console.log(firstname, lastname, username, email, password);
  try {
    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      console.log(`Email already in use: ${email}`); // Log the email
      return res.status(400).json({
        status: 400,
        error: `Email already in use: ${email}`,
      });
    }
    // Create the new user in the database
    const user = await createUser(
      firstname,
      lastname,
      username,
      email,
      password
    );
    const token = generateToken(user.id);
    // 201 Created status
    res.status(201).json({
      message: "Registration successful",
      token, // You can send the JWT token here for authentication
      user: {
        // Optionally, you can send back the user details (excluding password)
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in registration:", error); // Log the error
    res.status(500).json({ error: error, message: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    console.log(user);
    console.log("Login success");
    const token = generateToken(user.id);
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullname: `${user.firstname} ${user.lastname}`, // Include any other fields you want to send back
      },
    });
  } catch (error) {
    console.error("Error during login:", error); // Log the error for debugging
    res.status(500).json({ error: error, msg: "Login failed" });
  }
};
