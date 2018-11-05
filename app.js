import express from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import router from "./router";

const app = express();

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "static")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.locals.siteName = "WeTube";
  next();
});

app.use("/", router);

export default app;
