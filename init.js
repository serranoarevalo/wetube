import "./db";
import app from "./app";

const PORT = process.env.PORT || 3000;
const handleListening = () => {
  console.log(`✅  Server Listening on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
