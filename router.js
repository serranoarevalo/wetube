import express from "express";
import passport from "passport";
import routes from "./routes";
import userController from "./controllers/userController";
import videoController from "./controllers/videoController";
import { avatarUpload, videoUpload } from "./utils/fileUpload";

const router = express.Router();

// Auth

router.get(routes.facebookLogin, passport.authenticate("facebook"));
router.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: "/" }),
  userController.facebookLoginCallback
);

router.get(routes.githubLogin, passport.authenticate("github"));
router.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/" }),
  userController.githubLoginCallback
);

// Videos
router.get(routes.home, videoController.home);
router.get(routes.search, videoController.searchVideo);
router.get(routes.videoDetail(), videoController.videoDetail);
router.get(routes.editVideo, videoController.editVideo);

router
  .route(routes.upload)
  .get(userController.protectedRoute, videoController.getUploadVideo)
  .post(
    userController.protectedRoute,
    videoUpload.single("video"),
    videoController.postUploadVideo
  );

// Users

router.get(routes.user(), userController.getUserDetail);
router.get(routes.me, userController.protectedRoute, userController.getMe);
router.get(routes.logout, userController.getLogout);

router
  .route(routes.updatePassword)
  .get(userController.protectedRoute, userController.getUpdatePassword)
  .post(userController.protectedRoute, userController.postUpdatePassword);

router
  .route(routes.editProfile)
  .get(userController.protectedRoute, userController.getEditProfile)
  .post(
    userController.protectedRoute,
    avatarUpload.single("avatar"),
    userController.postEditProfile
  );

router
  .route(routes.login)
  .get(userController.onlyPublic, userController.getLogIn)
  .post(userController.onlyPublic, userController.postEmailLogIn);

router
  .route(routes.join)
  .get(userController.onlyPublic, userController.getJoin)
  .post(
    userController.onlyPublic,
    userController.postEmailRegister,
    userController.postEmailLogIn
  );

export default router;
