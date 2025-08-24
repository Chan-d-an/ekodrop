import { Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  name?: string;
  username?: string;
  email: string;
  password?: string;
  image: string;
  role: "user" | "admin";
  bio?: string;
  location?: string;
  contact_no?: string;
  language: string;
  timezone: string;

  // Authentication
  authProviderId?: string;
  isVerified: boolean;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
  resetPasswordToken?: string;
  resetPasswordTokenExpiry?: Date;
  lastLoginAt?: Date;
  loginCount: number;

  // Social Media
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  blockedUsers: Types.ObjectId[];
  savedPosts: Types.ObjectId[];

  // Subscription
  subscription: {
    plan: "free" | "premium" | "pro" | "enterprise";
    status: "active" | "inactive" | "canceled" | "expired";
    startDate?: Date;
    endDate?: Date;
    renewalDate?: Date;
    paymentProvider?: string;
    paymentProviderId?: string;
  };

  // Preferences
  preferences: {
    theme: "light" | "dark" | "system";
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };

  // Settings
  settings: {
    privacy: {
      profileVisibility: "public" | "private";
      allowAnonymousPosts: boolean;
    };
    contentModerationLevel: "low" | "medium" | "strict";
  };

  // Audit / Analytics
  lastActiveAt?: Date;
  deviceInfo: string[];
  ipAddresses: string[];

  createdAt: Date;
  updatedAt: Date;
}
