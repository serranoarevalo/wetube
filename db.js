import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
  process.env.DB,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

const handleOpen = () => console.log("✅  DB Connected");
const handleError = error => console.log(`❌ Error on DB Connection: ${error}`);

db.on("error", error => handleError(error));
db.once("open", handleOpen);

export default db;
