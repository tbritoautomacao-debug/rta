import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";
import { initSocket } from "./socket";

const server = http.createServer(app);

// inicializa websocket
initSocket(server);

// SEMPRE iniciar o servidor (produção e desenvolvimento)
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("Enterprise server running on port", port);
});

export default server;
