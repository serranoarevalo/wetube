import express from "express";
import userController from "./controllers/userController";
import videoController from "./controllers/videoController";

const router = express.Router();

// Videos

router.get("/", videoController.home);
router.get("/search", videoController.searchVideo);
router.get("/video/:id/edit", videoController.editVideo);
router.get("/video/:id", videoController.videoDetail);
router.get("/upload", videoController.uploadVideo);

// Users

router.get("/user/:id", userController.userDetail);
router.get("/edit-profile", userController.editProfile);
router.get("/me", userController.myProfile);
router.get("/login", userController.logIn);

export default router;
