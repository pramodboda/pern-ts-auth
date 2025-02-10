import express from "express";
import authRoutes from "./routes/authRoutes";
import { authenticate } from "./middleware/authMiddleware";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

// Example protected route
app.get("/api/protected", authenticate, (req, res) => {
  res.json({ message: "This is a protected route" });
});

export default app;
