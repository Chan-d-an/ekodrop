import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, maxlength: 1000 },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, maxlength: 1000 },
        upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        createdAt: { type: Date, default: Date.now },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    caption: { type: String, maxlength: 2200, trim: true },
    media: [
      {
        url: { type: String, required: true },
        type: { type: String, enum: ["image", "video"], default: "image" },
        thumbnail: { type: String }, // for videos
      },
    ],
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [CommentSchema],
    savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    hashtags: [{ type: String, lowercase: true, trim: true }],
    mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isAnonymous: { type: Boolean, default: false },
    visibility: {
      type: String,
      enum: ["public", "followers", "private"],
      default: "public",
    },
    isSensitive: { type: Boolean, default: false },
    reports: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        reason: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    impressions: { type: Number, default: 0 },
    reach: { type: Number, default: 0 },
    location: { type: String },
  },
  { timestamps: true }
);

PostSchema.virtual("score").get(function () {
  return (this.upvotes?.length || 0) - (this.downvotes?.length || 0);
});

export const Post =
  mongoose.models?.Post || mongoose.model("Post", PostSchema);
