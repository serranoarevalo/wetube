import express from "express";
import routes from "./routes";
import userController from "./controllers/userController";
import videoController from "./controllers/videoController";

const router = express.Router();

// Videos
router.get(routes.home, videoController.home);
router.get(routes.search, videoController.searchVideo);
router.get(routes.videoDetail(), videoController.videoDetail);
router.get(routes.editVideo, videoController.editVideo);
router.get(
  routes.upload,
  userController.protectedRoute,
  videoController.uploadVideo
);

// Users

router.get(routes.user(), userController.userDetail);
router.get(routes.me, userController.protectedRoute, userController.myProfile);

router
  .route(routes.updatePassword)
  .get(userController.protectedRoute, userController.getUpdatePassword)
  .post(userController.protectedRoute, userController.postUpdatePassword);

router
  .route(routes.editProfile)
  .get(userController.protectedRoute, userController.getEditProfile)
  .post(userController.protectedRoute, userController.postEditProfile);

router
  .route(routes.login)
  .get(userController.onlyPublic, userController.logIn)
  .post(userController.onlyPublic, userController.doEmailLogin);

router
  .route(routes.join)
  .get(userController.onlyPublic, userController.join)
  .post(
    userController.onlyPublic,
    userController.doRegister,
    userController.doEmailLogin
  );

export default router;
