import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // load environment variables



/* ===================== Connect MongoDB ===================== */
export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const dbName = mongoose.connection.name;
    console.log('🟢 MongoDB Connected, database:', dbName);
  }
  catch (error) {
    console.error('🔴 Database connection failed:', error);
    process.exit(1);
  }
}
