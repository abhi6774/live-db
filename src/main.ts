import { configDotenv } from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { initPrisma } from "./database";
import { ApplicationMiddleware } from "./middlewares";
import { CollectionNamespace } from "./nsps";
import routers, { StartUpRouter } from "./routers";
import { ApplicationService, NamespaceService } from "./services";
import { setMiddleWare, setRouters } from "./utils/utils";
configDotenv();


const app = express();
const server = createServer(app);
const io = new Server(server);

// Services
const applicationService = new ApplicationService();
const namespaceService = new NamespaceService();

const applicationMiddleware = new ApplicationMiddleware(applicationService);

app.use(express.json());

io.use(applicationMiddleware.socketIOMiddleware);

CollectionNamespace(io, namespaceService);

(async function () {
    await initPrisma();

    setMiddleWare([
        {
            routers: [StartUpRouter],
            middleware: applicationMiddleware.expressMiddleware
        }
    ]);

    setRouters(routers, app);
    server.listen(3000, () => console.log("Server running on port 3000"));
})();







