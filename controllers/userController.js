import passport from "passport";
import User from "../models/User";
import routes from "../routes";

// Edit Profile

const getEditProfile = (req, res) => {
  res.render("edit", { title: "Edit Profile" });
};

const postEditProfile = async (req, res) => {
  const {
    body,
    file: { location }
  } = req;

  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { ...body, avatarUrl: location || null }
    );
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

//  Log In

const getLogIn = (req, res) => {
  res.render("login", { title: "Log In" });
};

const postEmailLogIn = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: routes.home
});

// Facebook

const facebookLoginCallback = (req, res) => {
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

const getUserDetail = (req, res) => {
  res.render("user", { title: "User" });
};

const getMe = (req, res) => {
  res.render("user", { title: "Your Profile", canEdit: true });
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
