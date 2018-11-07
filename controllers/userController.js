import passport from "passport";
import User from "../models/User";
import routes from "../routes";

// Edit Profile

const getEditProfile = (req, res) => {
  res.render("edit", { title: "Edit Profile" });
};

const postEditProfile = async (req, res) => {
  const { body } = req;
  try {
    await User.findOneAndUpdate({ _id: req.user._id }, { ...body });
    res.redirect("/me");
  } catch (error) {
    res.render("edit", { title: "Edit Profile" });
  }
};

// Update Password

const getUpdatePassword = (req, res) =>
  res.render("password", { title: "Update Password" });

const postUpdatePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword2 },
    user
  } = req;
  try {
    if (newPassword === newPassword2) {
      await user.changePassword(oldPassword, newPassword);
      res.redirect(routes.me);
    } else {
      res.redirect(routes.updatePassword);
    }
  } catch (error) {
    res.redirect(routes.updatePassword);
  }
};

const userDetail = (req, res) => {
  res.render("user", { title: "User" });
};

const myProfile = (req, res) => {
  res.render("user", { title: "Your Profile", canEdit: true });
};

const logIn = (req, res) => {
  res.render("login", { title: "Log In" });
};

const join = (req, res) => {
  res.render("join", { title: "Join" });
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

const protectedRoute = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

const onlyPublic = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return next();
};

export default {
  getEditProfile,
  postEditProfile,
  getUpdatePassword,
  postUpdatePassword,
  userDetail,
  myProfile,
  logIn,
  join,
  doEmailLogin,
  doRegister,
  protectedRoute,
  onlyPublic
};
