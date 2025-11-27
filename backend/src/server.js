import connectDB from './config/db.js';
import express from "express";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import cors from 'cors';
import path from "path";
import jwt from "jsonwebtoken";
import fs from "fs";

import authRoute from './routes/auth.js';
import notificationsRoute from './routes/notifications.js';



// Load Environment Variables
dotenv.config();

// Connect MongoDB
await connectDB();

// Create App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoute);

app.use('/api/notifications', notificationsRoute);

app.get("/api/image/:filename", (req, res) => {
    const { filename } = req.params;
    const { token } = req.query;

    if (!token)
			return res.status(401).json({ message: "Missing token" });

    try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Safety check: token must match same file
			if (decoded.file !== filename)
				return res.status(403).json({ message: "Unauthorized file access" });

			const filePath = path.resolve("uploads", filename);

			if (!fs.existsSync(filePath))
				return res.status(404).json({ message: "File not found" });

			return res.sendFile(filePath);

    } catch (err) {
			return res.status(401).json({ message: "Invalid or expired image token" });
    }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🟢 Server running on port ${PORT}`));


// Find Hashed Password, comment out when not in need
const password = '123';
const saltRounds = 10;
bcrypt.hash(password, saltRounds, (err, hashed) => {
	if (err) console.error('Error hashing password:', err);
	else {
		console.log(`Plain Password: ${password}`);
		console.log(`Hashed Password: ${hashed}`);
	}
});
