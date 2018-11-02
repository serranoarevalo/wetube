export const userHello = (req, res) => {
  res.render("home", { message: "Dear", title: "Home" });
};

export default {
  userHello
};
