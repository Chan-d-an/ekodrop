import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
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
      default: "https://placehold.co/200x200?text=Avatar",
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
    location: { type: String, trim: true },
    contact_no: { type: String },
    language: { type: String, default: "en" },
    timezone: { type: String, default: "UTC" },

    // Authentication
    authProviderId: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, select: false },
    verificationTokenExpiry: { type: Date, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordTokenExpiry: { type: Date, select: false },
    lastLoginAt: { type: Date },
    loginCount: { type: Number, default: 0 },
    // Social Media Features
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    // Subscription
    subscription: {
      plan: {
        type: String,
        enum: ["free", "premium", "pro", "enterprise"],
        default: "free",
      },
      status: {
        type: String,
        enum: ["active", "inactive", "canceled", "expired"],
        default: "inactive",
      },
      startDate: { type: Date },
      endDate: { type: Date },
      renewalDate: { type: Date },
      paymentProvider: {
        type: String, // e.g., "stripe", "paypal"
      },
      paymentProviderId: {
        type: String, // subscription ID from provider
      },
    },
    preferences: {
      theme: { type: String, enum: ["light", "dark", "system"], default: "system" },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
      },
    },
    settings: {
      privacy: {
        profileVisibility: {
          type: String,
          enum: ["public", "private"],
          default: "public",
        },
        allowAnonymousPosts: { type: Boolean, default: true },
      },
      contentModerationLevel: {
        type: String,
        enum: ["low", "medium", "strict"],
        default: "medium",
      },
    },
    // Audit / Analytics
    lastActiveAt: { type: Date },
    deviceInfo: [{ type: String }], // e.g., ["iOS Safari", "Windows Chrome"]
    ipAddresses: [{ type: String }],
  },
  { timestamps: true }
);

export const User =
  mongoose.models?.User || mongoose.model("User", UserSchema);
