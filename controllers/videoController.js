const home = (req, res) => {
  res.render("home", { title: "Home" });
};

const searchVideo = (req, res) => {
  res.render("search", { title: "Search" });
};

const videoDetail = (req, res) => {
  res.render("detail", { title: "Detail" });
};

const uploadVideo = (req, res) => {
  res.render("upload", { title: "Upload" });
};

const editVideo = (req, res) => {
  res.render("edit-video", { title: "Edit Video" });
};

export default {
  searchVideo,
  home,
  videoDetail,
  uploadVideo,
  editVideo
};
