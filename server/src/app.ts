import express from "express";
import authRoutes from "./routes/authRoutes";
import { authenticate } from "./middleware/authMiddleware";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow cookies if needed
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);

// Example protected route
app.get("/api/protected", authenticate, (req, res) => {
  res.json({ message: "This is a protected route" });
});

export default app;
