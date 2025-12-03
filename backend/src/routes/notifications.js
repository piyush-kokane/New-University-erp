import { authMiddleware } from '../middleware/authMiddleware.js';
import User from '../models/user.js';
import express from 'express';

const router = express.Router();



/* ===================== Get Notifications ===================== */
router.get('/', authMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		if (!user) return res.status(404).json({ message: 'User not found' });

		return res.json(user.notifications);
	}
	catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
});

export default router;
