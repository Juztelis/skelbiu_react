import express from "express";
import LogIn from "../models/loginas.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/auth.js";
dotenv.config({ path: "./config.env" });
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

router.use(express.json());

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await LogIn.create({ username, email, password });
    const token = generateToken(user._id);
    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await LogIn.findOne({ email: req.body.email });

    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) throw new Error("Wrong password");

    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      token,
      userId: user._id,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
