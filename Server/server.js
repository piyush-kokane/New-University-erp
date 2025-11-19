import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import bcrypt from 'bcryptjs';

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('✅ MongoDB Connected'))
	.catch(err => {
		console.error('❌ MongoDB Connection Error:', err.message);
		process.exit(1);
	});

// Routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Find Hashed Password, comment out when not in need

const Password = 'admin123';
const saltRounds = 10;
bcrypt.hash(Password, saltRounds, (err, hashed) => {
	if (err) console.error('Error hashing password:', err);
	else console.log('Hashed Password:', hashed);
});
