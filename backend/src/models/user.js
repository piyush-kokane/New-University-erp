import mongoose from 'mongoose';


function getFirstName() {
  const fullName = this.fullName?.trim();
  if (!fullName) return '';
  const parts = fullName.split(' ');
  return parts[1] ? parts[0] : fullName; // if no split possible → return fullName
};


function getLastName() {
  const fullName = this.fullName?.trim();
  if (!fullName) return '';
  const parts = fullName.split(' ');
  return parts[1] ? parts.slice(1).join(' ') : fullName; // if no split possible → return fullName
};


function getBioTag() {
  return this.role;
}


function getBio() {
  return !this.role === 'student'
    ? 'Studies at MIT-WPU'
    : 'Works at MIT-WPU';
}


const KeyValue = {
  key:   { type: String, required: true },
  value: { type: String, required: true }
};


const UserDataSchema = new mongoose.Schema({
  role:      { type: String, required: true, enum: ['student', 'faculty', 'admin'] },
  status:    { type: String, required: true },
  fullName:  { type: String, required: true },
  firstName: { type: String, default: getFirstName },
  lastName:  { type: String, default: getLastName },
  contact:   { type: String, required: true },
  gmail:     { type: String, required: true },
  prn:       { type: String, required: true },
  branch:    { type: String, default: 'NA' },
  term:      { type: String, default: 'NA' },
  profile:   { type: String, default: 'default-profile.png' },
  banner:    { type: String, default: 'default-banner.png' },
  biotag:    { type: String, default: getBioTag },
  longBio:   { type: String, default: getBio },
  shortBio:  { type: String, default: getBio },
}, { _id: false });


const ParentInfoSchema = new mongoose.Schema({
  parentDetails: { type: [KeyValue], default: [], _id: false }
}, { _id: false });


const NotificationSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  message: { type: String, required: true },
  date:    { type: String, required: true },
  time:    { type: String, required: true },
}, { _id: false });


const UserSchema = new mongoose.Schema({
  username:      { type: String,               required: true, unique: true },
  password:      { type: String,               required: true },
  sessionId:     { type: String,               default: null },
  userData:      { type: UserDataSchema,       required: true },
  about:         { type: [KeyValue],           default: [], _id: false },
  moreInfo:      { type: [KeyValue],           default: [], _id: false },
  address:       { type: [KeyValue],           default: [], _id: false },
  parentInfo:    { type: [ParentInfoSchema],   default: [], _id: false },
  documents:     { type: [KeyValue],           default: [], _id: false },
  notifications: { type: [NotificationSchema], default: [], _id: false },
});


export default mongoose.model('users', UserSchema);
