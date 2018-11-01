import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 3000;
const handleListening = () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
