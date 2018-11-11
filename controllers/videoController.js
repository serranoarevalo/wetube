import Video from "../models/Video";
import Comment from "../models/Comment";
import routes from "../routes";
import makeFlash from "../utils/makeFlash";

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
    req.flash("success", "Video Uploaded");
    res.redirect(routes.videoDetail(newVideo._id));
  } catch (error) {
    req.flash("error", "Cant Upload Video");
    res.render("upload", {
      title: "Upload"
    });
  }
};

const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: -1 });
    res.render("home", {
      title: "Home",
      videos
    });
  } catch (error) {
    console.log(error);
    res.render("home", {
      title: "Home",
      videos: []
    });
  }
};

const videoDetail = async (req, res) => {
  const {
    params: { id },
    user
  } = req;
  try {
    const video = await Video.findOne({ _id: id }).populate("author");
    const comments = await Comment.find({ video: id }).populate("author");
    const related = await Video.find({ _id: { $ne: id } }).populate("author");
    let isAuthor = false;
    if (user && video) {
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
      throw Error();
    }
  } catch (error) {
    req.flash("error", "Video Not Found");
    res.redirect(routes.home);
  }
};

// Edit Controller

const getEditVideo = async (req, res) => {
  const {
    user,
    params: { id }
  } = req;
  try {
    const video = await Video.findOne({ _id: id });
    if (video) {
      res.render("edit-video", { title: "Edit Video", video });
    } else {
      throw Error();
    }
  } catch (error) {
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

// Search

const getSearchVideo = async (req, res) => {
  const {
    query: { terms }
  } = req;
  try {
    const videos = await Video.find({
      title: { $regex: terms, $options: "i" }
    });
    res.render("search", { title: "Search", term: terms, videos });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Utils

const isAuthor = async (req, res, next) => {
  const {
    user,
    params: { id }
  } = req;
  const video = await Video.findOne({ _id: id });
  if (String(video.author) !== user.id) {
    req.flash("error", "You don't own the video");
    res.redirect(routes.videoDetail(id));
  } else {
    next();
  }
};

export default {
  home,
  videoDetail,
  getUploadVideo,
  postUploadVideo,
  getEditVideo,
  isAuthor,
  postEditVideo,
  getDeleteVideo,
  getSearchVideo
};
