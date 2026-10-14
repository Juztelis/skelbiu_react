import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dns from "node:dns";
import dotenv from "dotenv";
import skelbRoutes from "./routes/skelbimu.js";
import logRoutes from "./routes/login.js"

dotenv.config({ path: "./config.env" });
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(cors());
app.use(express.json());

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.VITE_ATLAS_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}

async function disconnectFromMongoDB() {
  await mongoose.connection.close();
  console.log("Disconnected from MongoDB");
}

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

connectToMongoDB();

app.use("/api", skelbRoutes, logRoutes);