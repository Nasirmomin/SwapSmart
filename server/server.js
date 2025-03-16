import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/dbConnection.js";
import  router  from "./route/index.js";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

// Routes
app.use("/api", router);

// Connect to MySQL Database
connectDB();

// Sync Database with Models
sequelize.sync({ alter: true })
  .then(() => console.log(colors.green("✅ Database & Tables Synced Successfully!")))
  .catch(err => console.error(colors.red("❌ Error syncing database:"), err));

// Sample Route
app.get("/", (req, res) => {
  res.send("SwapSmart Backend Running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(colors.cyan(`🚀 Server running on port ${PORT}`));
});
