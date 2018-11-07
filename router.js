import express from "express";
import userController from "./controllers/userController";
import videoController from "./controllers/videoController";

const router = express.Router();

// Videos

router.get("/", videoController.home);
router.get("/search", videoController.searchVideo);
router.get("/video/:id/edit", videoController.editVideo);
router.get("/video/:id", videoController.videoDetail);
router.get(
  "/upload",
  userController.protectedRoute,
  videoController.uploadVideo
);

// Users

router.get("/user/:id", userController.userDetail);
router.get(
  "/edit-profile",
  userController.protectedRoute,
  userController.editProfile
);
router.get("/me", userController.protectedRoute, userController.myProfile);
router.get("/login", userController.onlyPublic, userController.logIn);
router.get("/join", userController.onlyPublic, userController.join);

router.post(
  "/join",
  userController.onlyPublic,
  userController.doRegister,
  userController.doEmailLogin
);
router.post("/login", userController.onlyPublic, userController.doEmailLogin);

export default router;
