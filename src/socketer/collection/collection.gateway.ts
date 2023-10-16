import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Namespace, Server, Socket } from "socket.io";

@WebSocketGateway()
export class CollectionGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    private readonly logger = new Logger(CollectionGateway.name);

    private namespaces: Map<string, Namespace> = new Map<string, Namespace>();

    @WebSocketServer() collectionHost: Server;

    constructor() { }

    afterInit(server: Server) {
        this.logger.log(`SocketIO for Collection Initialized`);
    }

    createNamespace(namespace: string) {
        const namespaceServer = this.collectionHost.of(namespace);
        this.namespaces.set(namespace, this.collectionHost.of(namespace));
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
        this.logger.log(`Client connected: ${this.collectionHost.name}`);
    }
    handleDisconnect(client: any) {
    }


}
