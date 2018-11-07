import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: "Video is required"
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "Author is required"
  },
  comment: {
    type: String,
    required: "Comment is required"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("Comment", CommentSchema);

export default model;
