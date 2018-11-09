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
  const videos = await Video.find({}).sort({ createdAt: -1 });
  res.render("home", { title: "Home", videos });
};

const searchVideo = (req, res) => {
  res.render("search", { title: "Search" });
};

const videoDetail = async (req, res) => {
  const {
    params: { id },
    user
  } = req;
  const video = await Video.findOne({ _id: id }).populate("author");
  const comments = await Comment.find({ video: id }).populate("author");
  const related = await Video.find({ _id: { $ne: id } }).populate("author");
  let isAuthor = false;
  if (user) {
    isAuthor = user.id === video.author.id;
  }
  if (video) {
    res.render("detail", {
      title: "Detail",
      video,
      comments,
      related,
      isAuthor
    });
  } else {
    // To Do 404
    res.redirect(routes.home);
  }
};

// Edit Controller

const getEditVideo = async (req, res) => {
  const {
    user,
    params: { id }
  } = req;
  const video = await Video.findOne({ _id: id });
  if (video) {
    res.render("edit-video", { title: "Edit Video", video });
  } else {
    res.redirect(routes.home);
  }
};

const postEditVideo = async (req, res) => {
  const {
    body: { title, description },
    params: { id }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.videoDetail(id));
  }
};

const getDeleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await Video.deleteOne({ _id: id });
    res.redirect(routes.home);
  } catch (error) {
    console.log(error);
    res.redirect(routes.editVideo(id));
  }
};

const isAuthor = async (req, res, next) => {
  const {
    user,
    params: { id }
  } = req;
  const video = await Video.findOne({ _id: id });
  if (String(video.author) !== user.id) {
    res.redirect(routes.videoDetail(id));
  } else {
    next();
  }
};

export default {
  searchVideo,
  home,
  videoDetail,
  getUploadVideo,
  postUploadVideo,
  getEditVideo,
  isAuthor,
  postEditVideo,
  getDeleteVideo
};
