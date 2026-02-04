
import { Server } from "socket.io";
let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: { origin: process.env.FRONTEND_URL }
  });

  io.on("connection", socket => {
    socket.on("join-restaurant", restaurantId => {
      socket.join(restaurantId);
    });
  });
};

export const emitOrderUpdate = (restaurantId: string, data: any) => {
  if (io) io.to(restaurantId).emit("order-update", data);
};
