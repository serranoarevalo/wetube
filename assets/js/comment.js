import axios from "axios";
const commentForm = document.getElementById("js-commentForm");
let commentTextArea;

const handleCommentSubmit = async event => {
  event.preventDefault();
  const value = commentTextArea.value;
  const videoId = window.location.href.split("/video/")[1];
  const commentRequest = await axios({
    method: "post",
    url: `/api/video/${videoId}/comment`,
    data: {
      text: value
    }
  });
  console.log(commentRequest);
};

const initComment = () => {
  commentTextArea = commentForm.querySelector(".comments__textarea");
  commentForm.addEventListener("submit", handleCommentSubmit);
};

if (commentForm) {
  initComment();
}
