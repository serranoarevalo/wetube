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
  res.render("login", { title: "Log In" });
};

const join = (req, res) => {
  res.render("join", { title: "Join" });
};

export default {
  userDetail,
  editProfile,
  myProfile,
  logIn,
  join
};
