const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true,},
  password: { type: String, },
  centre_id: { type: String, default: "00000" },
  location: String,
  mobile: String,
  email: String,
  source: String,
  profile_pic: { type: String,  },
  created_at: { type: Date, default: Date.now },
  expiry_date: { type: Date, },
  status: { type: String, enum: ['new', 'approved', 'rejected'], default: 'new' },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

// ✅ Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is new or changed
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
