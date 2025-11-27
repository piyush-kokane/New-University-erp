import express from "express";
import User from "../models/user.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===== GET Notifications ===== */
router.get("/", authMiddleware, async (req, res) => {
  try {
    // req.user.id comes from the decoded JWT
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return only notifications array
    return res.json(user.notifications);
  }
  catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
