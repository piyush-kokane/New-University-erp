import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const getFirstName = function () {
  const fullName = this.fullName?.trim();
  if (!fullName) return "";
  const parts = fullName.split(" ");
  return parts[1] ? parts[0] : fullName; // if no split possible → return fullName
};


const getLastName = function () {
  const fullName = this.fullName?.trim();
  if (!fullName) return "";
  const parts = fullName.split(" ");
  return parts[1] ? parts.slice(1).join(" ") : fullName; // if no split possible → return fullName
};


function generateBio() {
  return !this.role === "student"
    ? "Studies at MIT-WPU"
    : "Works at MIT-WPU";
}


const KeyValue = {
  key: { type: String, required: true },
  value: { type: String, required: true }
};


const UserDataSchema = new mongoose.Schema({
  role:      { type: String, required: true, enum: ["student", "faculty", "admin"] },
  status:    { type: String, required: true },
  fullName:  { type: String, required: true },
  firstName: { type: String, default: getFirstName },
  lastName:  { type: String, default: getLastName },
  contact:   { type: String, required: true },
  gmail:     { type: String, required: true },
  prn:       { type: String, required: true },
  branch:    { type: String, default: "NA" },
  term:      { type: String, default: "NA" },
  profile:   { type: String, default: "default-profile.png" },
  banner:    { type: String, default: "default-banner.png" },
  biotag:    { type: String, default: function () { return this.role } },
  longBio:   { type: String, default: function () { return generateBio() } },
  shortBio:  { type: String, default: function () { return generateBio() } },
}, { _id: false });


const ParentInfoSchema = new mongoose.Schema({
  parentDetails: { type: [KeyValue], default: [], _id: false }
}, { _id: false });


const NotificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
  }, { _id: false }
);


const UserSchema = new mongoose.Schema({
  username:   { type: String,             required: true, unique: true },
 	password:   { type: String,             required: true },
  userData:   { type: UserDataSchema,     required: true },
  about:      { type: [KeyValue],         default: [], _id: false },
  moreInfo:   { type: [KeyValue],         default: [], _id: false },
  address:    { type: [KeyValue],         default: [], _id: false },
  parentInfo: { type: [ParentInfoSchema], default: [], _id: false },
  documents:  { type: [KeyValue],         default: [], _id: false },
  notifications:  { type: [NotificationSchema], default: [], _id: false },
});


// Hash password before saving
/*
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
*/


export default mongoose.model("users", UserSchema);
