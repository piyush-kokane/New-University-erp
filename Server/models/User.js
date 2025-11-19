import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Role: String,
  Status: String,
  FullName: String,
  FirstName: String,
  LastName: String,
  Contact: String,
  Gmail: String,
  Prn: String,
  Branch: String,
  Term: String,
  Profile: String,
  Banner: String,
  Biotag: String,
  LongBio: String,
  ShortBio: String,
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("Users", userSchema);
