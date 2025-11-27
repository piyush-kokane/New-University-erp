import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

/* ===== Generate Signed Url ===== */
function generateSignedImageURL(filename) {
	const token = jwt.sign({ file: filename }, process.env.JWT_SECRET, { expiresIn: "18h" });
	return `/api/image/${filename}?token=${token}`;
}

/* ===== LOGIN ===== */
router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	const now = new Date();

	try {
		// Find user by username
		const user = await User.findOne({ username });
		if (!user) return res.status(400).json({ message: 'User not found' });

		// Compare password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

		// Log
		console.log(` ● User '${username}' loged in at: ${now}`);

		// Sign token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '18h' });

		// Signed URLs
		const profileURL = generateSignedImageURL(user.userData.profile);
    const bannerURL  = generateSignedImageURL(user.userData.banner);

		// Copy userData
		const userObj = { ...user.userData._doc };

		// Replace the original fields with URL values
		userObj.profile = profileURL;
		userObj.banner  = bannerURL;

		// Send token + UserData to client
		return res.json({ token, userData: userObj });
	}
	catch (error) {
		console.error('🔴 Login error:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

export default router;
