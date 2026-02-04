
import http from "http";
import app from "./app";
import { initSocket } from "./socket";

const server = http.createServer(app);
initSocket(server);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log("Enterprise server running", port));
