export const userHello = (req, res) => {
  res.render("index", { message: "Dear" });
};

export default {
  userHello
};
