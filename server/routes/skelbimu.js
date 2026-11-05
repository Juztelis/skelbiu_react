import express from "express";
import Skelbimai from "../models/skelbimai.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.use(express.json());

router.get("/skelbimas", async (req, res) => {
  try {
    const skelbs = await Skelbimai.find();
    res.json(skelbs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/skelbimas", authenticateToken, async (req, res) => {
  try {
    const skelb = await Skelbimai.create(req.body);
    res.status(201).json({
      message: "Skelbimas succesfully created",
      data: skelb,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/skelbimas/:id", authenticateToken, async (req, res) => {
  try {
    const skelb = await Skelbimai.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(skelb);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/skelbimas/:id", authenticateToken, async (req, res) => {
  try {
    await Skelbimai.findByIdAndDelete(req.params.id);
    res.json({ message: "Skelbimas istrintas" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
