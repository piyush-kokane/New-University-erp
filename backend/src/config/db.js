import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // load environment variables



/* ===================== Connect MongoDB ===================== */
export default async function connectDB() {
  // Connect DB
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const dbName = mongoose.connection.name;
    console.log('🟢 MongoDB Connected, database:', dbName);
  }
  catch (error) {
    console.error("🔴 DB connection failed:", error.message);
    process.exit(1);
  }

  // Listen for runtime DB errors after connection
  mongoose.connection.on("error", err => {
    console.error("🔴 Mongoose runtime error:", err.message);
  });
}
