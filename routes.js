const HOME = "/";

// Videos
const SEARCH = "/search";
const VIDEO = "/video/:id";
const EDIT_VIDEO = "/video/:id/edit";
const DELETE_VIDEO = "/video/:id/delete";
const UPLOAD = "/upload";
const REGISTER_VIEW = "/api/video/:id/view";

// Users
const LOGIN = "/login";
const JOIN = "/join";
const USER = "/user/:id";
const ME = "/me";
const EDIT_PROFILE = "/me/edit";
const UPDATE_PASSWORD = "/me/edit/password";
const LOG_OUT = "/logout";
const FACEBOOK_LOGIN = "/auth/facebook";
const FACEBOOK_CALLBACK = "/auth/facebook/callback";
const GITHUB_LOGIN = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Comments

const POST_COMMENT = "/api/video/:id/comment";
const DELETE_COMMENT = "/api/comment/:id/delete";

const routes = {
  postComment: POST_COMMENT,
  deleteComment: DELETE_COMMENT,
  home: HOME,
  search: SEARCH,
  editVideo: id => {
    if (id) {
      return `/video/${id}/edit`;
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: id => {
    if (id) {
      return `/video/${id}/delete`;
    } else {
      return DELETE_VIDEO;
    }
  },
  upload: UPLOAD,
  login: LOGIN,
  join: JOIN,
  user: id => {
    if (id) {
      return `/user/${id}`;
    } else {
      return USER;
    }
  },
  me: ME,
  editProfile: EDIT_PROFILE,
  updatePassword: UPDATE_PASSWORD,
  videoDetail: id => {
    if (id) {
      return `/video/${id}`;
    } else {
      return VIDEO;
    }
  },
  logout: LOG_OUT,
  facebookLogin: FACEBOOK_LOGIN,
  facebookCallback: FACEBOOK_CALLBACK,
  githubLogin: GITHUB_LOGIN,
  githubCallback: GITHUB_CALLBACK,
  registerView: REGISTER_VIEW
};

export default routes;
