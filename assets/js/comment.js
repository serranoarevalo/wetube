import axios from "axios";
const commentForm = document.getElementById("js-commentForm");
let commentTextArea,
  currentAvatar,
  commentList,
  commentsCount,
  deleteCommentBtn;

const getCommentCount = () => {
  const commentsString = commentsCount.innerText;
  const commentsInt = parseInt(commentsString);
  return commentsInt;
};

const decreaseCommentCount = () => {
  const commentNumber = getCommentCount();
  commentsCount.innerText = commentNumber - 1;
};

const increaseCommentCount = () => {
  const commentNumber = getCommentCount();
  commentsCount.innerText = commentNumber + 1;
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

const destroyComment = element => {
  const li = element.parentNode;
  commentList.removeChild(li);
};

const deleteComment = async event => {
  const { target } = event;
  const btnParent = target.parentNode;
  const videoId = btnParent.getAttribute("data-id");
  const { status } = await axios({
    method: "delete",
    url: `/api/comment/${videoId}/delete`
  });
  if (status === 200) {
    decreaseCommentCount();
    destroyComment(btnParent);
  }
};

const initComment = () => {
  commentTextArea = commentForm.querySelector(".comments__textarea");
  currentAvatar = commentForm.querySelector(".comments__user");
  commentList = document.getElementById("js-commentList");
  commentsCount = document.getElementById("js-countNumber");
  deleteCommentBtn = document.querySelectorAll(".canDelete");
  commentForm.addEventListener("submit", handleCommentSubmit);
  Array.from(deleteCommentBtn).forEach(button =>
    button.addEventListener("click", deleteComment)
  );
};

if (commentForm) {
  initComment();
}
