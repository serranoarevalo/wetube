import passport from "passport";
import User from "../models/User";
import Video from "../models/Video";
import routes from "../routes";

// Edit Profile

const getEditProfile = (req, res) => {
  res.render("edit", { title: "Edit Profile" });
};

const postEditProfile = async (req, res) => {
  const { body, file, user } = req;
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { ...body, avatarUrl: file ? file.location : user.avatarUrl }
    );
    req.flash("success", "Profile updated!");
    res.redirect("/me");
  } catch (error) {
    req.flash("error", "Can't edit profile");
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
      req.flash("success", "Password Updated!");
      res.redirect(routes.me);
    } else {
      res.status(304);
      req.flash("error", "Make sure the verification password matches");
      res.redirect(routes.updatePassword);
    }
  } catch (error) {
    res.status(304);
    req.flash("error", "Can't update password");
    res.redirect(routes.updatePassword);
  }
};

//  Log In

const getLogIn = (req, res) => {
  res.render("login", { title: "Log In" });
};

const postEmailLogIn = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: routes.home,
  successFlash: "Welcome"
});

// Facebook

const facebookLoginCallback = (req, res) => {
  req.flash("success", "Welcome!");
  res.redirect(routes.home);
};

const facebookLogin = async (accessToken, refreshToken, profile, cb) => {
  const { id, name, email } = profile._json;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        facebookId: id,
        avatarUrl: `http://graph.facebook.com/${id}/picture?type=large`
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

// Github

const githubLoginCallback = (req, res) => {
  req.flash("success", "Welcome!");
  res.redirect(routes.home);
};

const githubLogin = async (accessToken, refreshToken, profile, cb) => {
  const { id, name, email, avatar_url } = profile._json;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl: avatar_url
      }).save();
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

// User Profiles

const getUserDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findOne({ _id: id });
    const videos = await Video.find({ author: id });
    res.render("user", { title: user.name, user, videos });
  } catch (error) {
    req.flash("error", "User not found");
    res.redirect(routes.home);
  }
};

const getMe = async (req, res) => {
  const { user } = req;
  const videos = await Video.find({ author: user._id });
  res.render("user", { title: "Your Profile", canEdit: true, user, videos });
};

// Join

const getJoin = (req, res) => {
  res.render("join", { title: "Join" });
};

const postEmailRegister = async (req, res, next) => {
  const {
    body: { password, verifyPassword, email, name }
  } = req;
  if (password !== verifyPassword) {
    res.status(401);
    req.flash("error", "Passwords do not match");
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

// Log Out

const getLogout = (req, res) => {
  req.logout();
  return res.redirect(routes.home);
};

// Utilities

const protectedRoute = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

const onlyPublic = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect(routes.home);
  }
  return next();
};

export default {
  getEditProfile,
  postEditProfile,
  getUpdatePassword,
  postUpdatePassword,
  getLogIn,
  postEmailLogIn,
  getUserDetail,
  getMe,
  getJoin,
  postEmailRegister,
  protectedRoute,
  onlyPublic,
  getLogout,
  facebookLoginCallback,
  facebookLogin,
  githubLoginCallback,
  githubLogin
};
