import express from "express";
import logger from "morgan";
import path from "path";
import mustacheExpress from "mustache-express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import router from "./router";

const app = express();

app.engine("mst", mustacheExpress());
app.set("view engine", "mst");
app.set("views", path.join(__dirname, "templates"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", router);

export default app;
