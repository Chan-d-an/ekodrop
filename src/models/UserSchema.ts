import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    select: false,
  },
  image: {
    type: String,
    required: false,
    default: "https://placehold.net/avatar-2.svg",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  location: {
    type: String,
    trim: true,
  },
  contact_no: {
    type: String,
  },
  language: { type: String, default: "en" },
  timezone: { type: String, default: "UTC" },
  authProviderId: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    select: false,
  },
  verificationTokenExpiry: {
    type: Date,
    select: false,
  },
  resetPasswordToken: {
    type: String,
    select: false,
  },
  resetPasswordTokenExpiry: {
    type: Date,
    select: false,
  },

},
  {
    timestamps: true,
  });

export const User = mongoose.models?.User || mongoose.model("User", UserSchema);
