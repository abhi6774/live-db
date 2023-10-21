import { Namespace, Server, Socket } from "socket.io";

const namespaces = new Map<string, Namespace>();

const collectionNamespace = (io: Server) => {
    const collection = io.of(/\w*/);



    collection.on("connection", (socket: Socket) => {
        if (namespaces.has(socket.nsp.name)) {
            namespaces.get(socket.nsp.name)!.emit("new connection", socket.id);
        } else {
            namespaces.set(socket.nsp.name, socket.nsp);
        }
    });


    return collection;
}

export default collectionNamespace;
