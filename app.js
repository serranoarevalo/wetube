import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import router from "./router";
import "./passport";

const app = express();

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "static")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.user = req.user || null;
  next();
});

app.use("/", router);

export default app;
