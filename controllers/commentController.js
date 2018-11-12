import Video from "../models/Video";
import Comment from "../models/Comment";
import routes from "../routes";

const postComment = async (req, res) => {
  const {
    body: { text },
    params: { id },
    user
  } = req;
  try {
    await Comment.create({
      comment: text,
      video: id,
      author: user._id
    });
    res.status(200);
    res.end();
  } catch (error) {
    res.status(400);
    res.end();
  }
};

const deleteComment = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    await Comment.deleteOne({ _id: id });
    res.status(200);
    res.end();
  } catch (error) {
    res.status(400);
    res.send();
  }
};

export default {
  postComment,
  deleteComment
};
