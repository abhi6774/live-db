
import { Server, Socket } from "socket.io";
import { NamespaceService } from "../services";
import { Logger } from "../utils";


const logger = new Logger();

const collectionNamespace = (io: Server, namespaceService: NamespaceService) => {
    const collection = io.of(/\w*/);

    collection.on("connection", (socket: Socket) => {
        const namespace = socket.nsp;
        const documentId = socket.handshake.headers["document-id"] as string;
        const namespaceName = namespace.name;

        socket.on("disconnect", () => {
            logger.log("Socket disconnected from namespace: ", namespaceName);
            if (namespaceService.has(namespaceName)) namespaceService.remove(namespaceName);
        });

        const { error, result } = namespaceService.add(namespaceName, documentId, namespace);
        logger.log("Room", documentId, "joined")
        socket.join(documentId);

        if (error !== null) {
            socket.emit("error", result);
            socket.disconnect();
            return;
        } else {
            logger.log("Connection Successfull")
            socket.emit("namespaces", Array.from(namespaceService.getAll().keys()).map(n => ({ name: n, connected: namespaceName === n })));
            socket.broadcast.in(documentId).emit("rooms", Array.from(socket.rooms.values()))
        }
    });

    return collection;
}

export default collectionNamespace;
