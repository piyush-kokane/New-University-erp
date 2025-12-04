import { authMiddleware } from '../middleware/authMiddleware.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const router = express.Router();

const tokenExpiry = '18h';



/* ===================== Generate Signed Url ===================== */
function generateSignedImageURL(userId, sessionId, filename) {
  // Sign image token
  const token = jwt.sign(
    { id: userId, sessionId: sessionId, file: filename },
    process.env.JWT_SECRET,
    { expiresIn: tokenExpiry }
  );

  // Get Secure Image Access
  return `/api/image/${filename}?token=${token}`;
}



/* ===================== LOGIN ===================== */
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

    // Session ID
    const newSessionId = crypto.randomUUID();
    user.sessionId = newSessionId;
    await user.save();

    // Sign token
    const token = jwt.sign(
      { id: user._id, sessionId: newSessionId },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiry }
    );

    // Signed URLs
    const profileURL = generateSignedImageURL(user._id, newSessionId, user.userData.profile);
    const bannerURL  = generateSignedImageURL(user._id, newSessionId, user.userData.banner);

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



/* ===================== LOGOUT ===================== */
router.post('/logout', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Invalidate all tokens by generating new session ID
    user.sessionId = crypto.randomUUID();
    await user.save();

    return res.json({ message: 'Logged out successfully' });
  }
  catch (error) {
    res.status(500).json({ message: 'Error logging out' });
  }
});


export default router;
