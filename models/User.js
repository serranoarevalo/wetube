import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  avatarUrl: String,
  email: {
    type: String,
    required: "Email is required",
    validate: [validator.isEmail]
  }
});

const model = mongoose.model("User", UserSchema);

export default model;
