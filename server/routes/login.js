import express from "express";
import LogIn from "../models/loginas.js"

const router = express.Router();

router.use(express.json());

router.post("/register", async (req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: "Could not register user" });
    }
});

router.get("/login", async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (!user) {
        return res.status(401).json({
            error: "Wrong username or password"
        });
    }

    res.json({
        message: "Login successful",
        userId: user._id,
        username: user.username
    });
});

// router.put("/login/:id", async (req, res) => {
//     try {
//         const log = await LogIn.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );

//         res.json(log);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// router.delete("/login/:id", async (req, res) => {
//     try {
//         await LogIn.findByIdAndDelete(req.params.id);
//         res.json({ message: "paskira istrinta" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

export default router;
