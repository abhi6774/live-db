import { Logger } from "@nestjs/common";
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Namespace, Socket } from "socket.io";
import { MessageService } from "./services/messages.service";

@WebSocketGateway({
    namespace: "messages"
})
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() messagingServer: Namespace;

    private readonly logger = new Logger(MessagesGateway.name);

    constructor(private messageService: MessageService) { }

    afterInit(server: any) {
        this.logger.log(`${MessagesGateway.name} Initialized`);
    }

    handleConnection(client: Socket, args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    @SubscribeMessage("message")
    handleMessage(client: Socket, payload: any) {
        this.logger.log(`Message received: ${payload}`);
        this.messageService.saveMessage(payload);

        this.messagingServer.emit("messages", this.messageService.getMessages());
    }



    handleDisconnect(client: any) {

    }
}
