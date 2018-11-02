import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "User is required"
  },
  email: {
    type: String,
    required: "Email is required",
    validate: [validator.isEmail]
  }
});
