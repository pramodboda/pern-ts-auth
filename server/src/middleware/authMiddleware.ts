import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtUtils";

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
    const decoded = verifyToken(token);
    (req as any).userId = (decoded as any).userId;
    next();
  } catch (error) {
    res.status(401).json({ error: error, msg: "Invalid token" });
  }
};
