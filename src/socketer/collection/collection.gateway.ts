import { Inject, Injectable, Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Namespace, Server, Socket } from "socket.io";
import { CollectionService } from "./services/collection.service";

@Injectable()
export class CollectionGateway {

    private readonly logger = new Logger(CollectionGateway.name);


    constructor(private collectionService: CollectionService) { }

    private namespaces: Map<string, Namespace> = new Map<string, Namespace>();

    getNamespace(name: string) {
        if (this.namespaces.has(name)) {
            return this.namespaces.get(name);
        }
        return null;
    }

    createNamespace(name: string, nsp: Namespace) {
        const namespace = this.collectionService.createCollection(name);
        this.namespaces.set(name, nsp);
        this.logger.log(`Namespace created: ${name}`);
        this.logger.log(JSON.stringify(this.namespaces))
        return namespace;
    }
}
