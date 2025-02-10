// src/types/express.d.ts
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // or the appropriate type (e.g., `number` or `string` depending on your implementation)
    }
  }
}
