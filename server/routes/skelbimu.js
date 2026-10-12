import express from "express";
import Skelb from "../models/skelbimai.js";

const router = express.Router();

router.use(express.json());

router.post("/skelbimas", async (req, res) => {
    try {
        const skelb = await Skelb.create(req.body);
        res.status(201).json({
            message: "Skelbimas succesfully created",
            data: skelb
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/skelbimas", async (req, res) => {
    try {
        const skelbs = await Skelb.find();
        res.json(skelbs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/skelbimas/:id", async (req, res) => {
    try {
        const skelb = await Skelb.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(skelb);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/skelbimas/:id", async (req, res) => {
    try {
        await Skelb.findByIdAndDelete(req.params.id);
        res.json({ message: "Skelbimas istrintas" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;

