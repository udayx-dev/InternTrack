require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth.routes");
const applicationRoutes = require("./src/routes/application.routes");
const { errorHandler } = require("./src/middleware/error.middleware");
const AppError = require("./src/utils/AppError");

const app = express();

connectDB();

// Allow multiple origins (local dev + deployed frontend)
const ALLOWED_ORIGINS = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, mobile apps, server-to-server)
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin ${origin} not allowed`));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Trust proxy — required on Render/Railway so req.secure works correctly
app.set("trust proxy", 1);

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/health", (req, res) =>
  res.status(200).json({ status: "OK", env: process.env.NODE_ENV })
);

app.all("*", (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found.`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} [${process.env.NODE_ENV}]`);
});