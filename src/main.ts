import express from "express";
import { createServer } from "http";
import { ApplicationRouter } from "routers/application.router";
import { Server } from "socket.io";
import { initPrisma } from "./database";

(async function () {
    // Connecting to Databse
    await initPrisma();
})();

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use("application", ApplicationRouter);

server.listen(3000, () => console.log("Server running on port 3000"));



