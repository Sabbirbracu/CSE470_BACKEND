const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const rootRouter = require("./routes/rootRouter");

const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration (adjust origin as needed)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Middlewares
app.use(express.json());

// API Routes
app.use(rootRouter);

// Default route
app.get("/", (req, res) => {
  res.send("🎓 BRAC Education & Communication API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
