import { Server, Socket } from "socket.io";
import { NamespaceService } from "../services";

const collectionNamespace = (io: Server, namespaceService: NamespaceService) => {
    const collection = io.of(/\w*/);

    collection.on("connection", (socket: Socket) => {
        const namespace = socket.nsp;
        const namespaceName = namespace.name;

        if (!namespaceService.has(namespaceName)) {
            namespaceService.add(namespaceName, namespace);
        }
    });

    return collection;
}

export default collectionNamespace;
