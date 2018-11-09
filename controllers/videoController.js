import Video from "../models/Video";
import routes from "../routes";

// Upload Video

const getUploadVideo = (req, res) => {
  res.render("upload", { title: "Upload" });
};

const postUploadVideo = async (req, res) => {
  const {
    user,
    body,
    file: { location }
  } = req;
  try {
    const newVideo = await Video.create({
      ...body,
      fileUrl: location,
      author: user._id
    });

    res.redirect(routes.user(user._id));
  } catch (error) {
    console.log(error);
    res.render("upload", { title: "Upload" });
  }
};

const home = async (req, res) => {
  const videos = await Video.find({});
  res.render("home", { title: "Home" });
};

const searchVideo = (req, res) => {
  res.render("search", { title: "Search" });
};

const videoDetail = (req, res) => {
  res.render("detail", { title: "Detail" });
};

const editVideo = (req, res) => {
  res.render("edit-video", { title: "Edit Video" });
};

export default {
  searchVideo,
  home,
  videoDetail,
  getUploadVideo,
  postUploadVideo,
  editVideo
};
