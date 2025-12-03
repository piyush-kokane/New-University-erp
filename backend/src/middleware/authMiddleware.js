import User from '../models/user.js';
import jwt from 'jsonwebtoken';



/* ===================== Verify sessionId + JWT ===================== */
export async function authMiddleware(req, res, next) {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) return res.status(400).json({ message: 'Token not provided' });

	try {
    // Decode JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract userId + sessionId from token
    const { id, sessionId } = decoded;

    // Find user and validate sessionId
    const user = await User.findById(id).select('sessionId');
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.sessionId !== sessionId) return res.status(401).json({ message: 'Session expired' });

    // Attach user details to request
    req.user = decoded;

    // Continue
    next();
	}
	catch (error) {
		res.status(401).json({ message: 'Token expired or invalid' });
	}
}
