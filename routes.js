const HOME = "";

// Videos
const SEARCH = "/search";
const VIDEO = "/video/:id";
const EDIT_VIDEO = "/video/:id/edit";
const UPLOAD = "/upload";

// Users
const LOGIN = "/login";
const JOIN = "/join";
const USER = "/user/:id";
const ME = "/me";
const EDIT_PROFILE = "/me/edit";
const UPDATE_PASSWORD = "/me/edit/password";
const LOG_OUT = "/logout";

const routes = {
  home: HOME,
  search: SEARCH,
  editVideo: EDIT_VIDEO,
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
  logout: LOG_OUT
};

export default routes;
