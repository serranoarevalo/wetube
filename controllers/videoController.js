import Video from "../models/Video";
import Comment from "../models/Comment";
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
    res.redirect(routes.videoDetail(newVideo._id));
  } catch (error) {
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

const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  const video = await Video.findOne({ _id: id }).populate("author");
  const comments = await Comment.find({ video: id }).populate("author");
  if (video) {
    res.render("detail", { title: "Detail", video, comments });
  } else {
    // To Do 404
    res.redirect(routes.home);
  }
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
