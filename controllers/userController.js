import passport from "passport";
import User from "../models/User";

const userDetail = (req, res) => {
  res.render("user", { title: "User" });
};

const editProfile = (req, res) => {
  res.render("edit-profile", { title: "Edit Profile" });
};

const myProfile = (req, res) => {
  res.render("user", { title: "Your Profile" });
};

const logIn = (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login", { title: "Log In" });
  }
};

const join = (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("join", { title: "Join" });
  }
};

const doEmailLogin = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/"
});

const doRegister = async (req, res, next) => {
  const {
    body: { password, verifyPassword, email, name }
  } = req;
  if (password !== verifyPassword) {
    res.status(401);
    res.render("join", { title: "Log In" });
  }
  const user = new User({ email, name });
  try {
    await User.register(user, password);
    next();
  } catch (error) {
    console.log(error);
  }
};

export default {
  userDetail,
  editProfile,
  myProfile,
  logIn,
  join,
  doEmailLogin,
  doRegister
};
