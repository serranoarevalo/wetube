import express from "express";
import userController from "./controllers/userController";

const router = express.Router();

router.get("/", userController.userHello);

export default router;
