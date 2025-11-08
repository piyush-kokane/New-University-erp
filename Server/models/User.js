import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  role: String,
  fullName: String,
  branch: String,
  term: String,
  status: String,
  profile: String,
  banner: String,
  bio: String
});

export default mongoose.model("User", userSchema);
