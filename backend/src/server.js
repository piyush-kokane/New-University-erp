import connectDB from './config/db.js';
import express from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoute from './routes/auth.js';
import imageRoute from './routes/image.js';
import notificationsRoute from './routes/notifications.js';



dotenv.config(); // load environment variables

await connectDB(); // connect MongoDB

const app = express(); // create app


// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoute);
app.use('/api/image', imageRoute);
app.use('/api/notifications', notificationsRoute);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🟢 Server running on port ${PORT}`));


// Find Hashed Password, comment out when not in need
/*
const password = '123';
const saltRounds = 10;
bcrypt.hash(password, saltRounds, (err, hashed) => {
	if (err) console.error('Error hashing password:', err);
	else {
		console.log(`Plain Password: ${password}`);
		console.log(`Hashed Password: ${hashed}`);
	}
});
*/
