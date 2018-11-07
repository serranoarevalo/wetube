import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";
import userController from "./controllers/userController";
import videoController from "./controllers/videoController";

const router = express.Router();

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_KEY_ID
});

const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube/avatars"
  })
});

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

router.get(routes.user(), userController.getUserDetail);
router.get(routes.me, userController.protectedRoute, userController.getMe);

router
  .route(routes.updatePassword)
  .get(userController.protectedRoute, userController.getUpdatePassword)
  .post(userController.protectedRoute, userController.postUpdatePassword);

router
  .route(routes.editProfile)
  .get(userController.protectedRoute, userController.getEditProfile)
  .post(
    userController.protectedRoute,
    upload.single("avatar"),
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
