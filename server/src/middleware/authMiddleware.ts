import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";

// Define the structure of the decoded JWT payload
interface DecodedToken {
  userId: string; // Adjust this based on your JWT payload structure
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const decoded = verifyToken(token) as DecodedToken; // Assert the type here
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: error, msg: "Invalid token" });
  }
};
