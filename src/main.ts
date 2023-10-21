import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { initPrisma } from "./database";
import { CollectionNamespace } from "./nsps";
import { ApplicationRouter, StartUpRouter } from "./routers";

(async function () {
    // Connecting to Databse
    const prisma = await initPrisma();
})();

const app = express();

app.use(express.json());

const server = createServer(app);
const io = new Server(server);


const collectionNamespace = CollectionNamespace(io);

app.use("/application", ApplicationRouter);
app.use("/startup", StartUpRouter);


server.listen(3000, () => console.log("Server running on port 3000"));



