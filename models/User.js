import mongoose from "mongoose";
import validator from "validator";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  avatarUrl: String,
  email: {
    type: String,
    required: "Email is required",
    validate: [validator.isEmail]
  },
  facebookId: Number
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
