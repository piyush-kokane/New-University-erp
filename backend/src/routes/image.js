import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router();


/* ================ Get Secure Image Access ================ */
router.get('/:filename', async (req, res) => {
	const { filename } = req.params;
	const { token } = req.query;

	if (!token) return res.status(400).json({ message: 'Token not provided' });

	try {
		// Decode JWT
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Extract filename + userId + sessionId from token
    const { id, sessionId, file } = decoded;

		// Find user and validate sessionId
    const user = await User.findById(id).select('sessionId');
		if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.sessionId !== sessionId) return res.status(401).json({ message: 'Session expired' });

		// Ensure token was generated for this file
		if (file !== filename) return res.status(403).json({ message: 'Unauthorized file access' });

		// Get file path
		const filePath = path.resolve('uploads', filename);

		// File must exist
		if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'File not found' });

		// Return file
		return res.sendFile(filePath);
	}
	catch (error) {
		return res.status(401).json({ message: 'Image token expired or invalid' });
	}
});

export default router;
