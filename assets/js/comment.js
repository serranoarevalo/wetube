import axios from "axios";
const commentForm = document.getElementById("js-commentForm");
let commentTextArea, currentAvatar, commentList, commentsCount;

const increaseCommentCount = () => {
  const commentsString = commentsCount.innerText;
  const commentsInt = parseInt(commentsString);
  commentsCount.innerText = commentsInt + 1;
};

const handleCommentSubmit = async event => {
  event.preventDefault();
  const value = commentTextArea.value;
  const videoId = window.location.href.split("/video/")[1];
  const { status } = await axios({
    method: "post",
    url: `/api/video/${videoId}/comment`,
    data: {
      text: value
    }
  });
  if (status === 200) {
    const newComment = `
      <a href="/me">
      ${currentAvatar.outerHTML}
      </a>
      <div class="comment__user-data">
        <div class="comment__title">
          <a href="/me">
            <span class="comment__username">You</span>
          </a>
          <span class="comment__timestamp">Just now</span>
      </div>
      <p class="comment__content">${value}</p>
      </div>
    `;
    const comment = document.createElement("li");
    comment.classList.add("comment");
    comment.innerHTML = newComment;
    commentList.prepend(comment);
    commentTextArea.value = "";
    increaseCommentCount();
  }
};

const initComment = () => {
  commentTextArea = commentForm.querySelector(".comments__textarea");
  currentAvatar = commentForm.querySelector(".comments__user");
  commentList = document.getElementById("js-commentList");
  commentsCount = document.getElementById("js-countNumber");
  commentForm.addEventListener("submit", handleCommentSubmit);
};

if (commentForm) {
  initComment();
}
