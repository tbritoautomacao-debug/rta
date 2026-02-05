
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";
import { initSocket } from "./socket";

const server = http.createServer(app);
initSocket(server);

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log("Enterprise server running on port", port);
  });
}

export default server;

