import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {sequelize} from "../server/src/config/dbConnection.js";  // Database configuration (Sequelize instance)
import router from "./src/route/index.js";


dotenv.config({ path: './.env' });  // Load environment variables from .env
console.log(process.env.JWT_SECRET);

const app = express();

// Middleware
app.use(express.json());  // Parse incoming JSON requests
app.use(cors());  // Enable Cross-Origin Request Sharing (CORS)

// Routes
app.use("/api",router);  // User-related routes (e.g., register, login, change password)// FAQ-related routes (e.g., add, list FAQs)

// Catch-all route for undefined routes
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

sequelize.sync({force:false}).then(() => {
  console.log("Database connected successfully");
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Database connection error:", error);
});
