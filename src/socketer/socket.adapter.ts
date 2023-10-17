import { INestApplication, Logger } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server, ServerOptions, Socket } from "socket.io";
import { ApplicationService } from "src/applications/services/applications.service";
import { CollectionGateway } from "./collection/collection.gateway";

export class SocketIOAdapter extends IoAdapter {

    private readonly logger = new Logger(SocketIOAdapter.name);
    applicationSerivce: ApplicationService;
    collectionGateway: CollectionGateway;

    constructor(private app: INestApplication) {
        super(app);
        this.applicationSerivce = app.get(ApplicationService);
        this.appAuthenticator = this.appAuthenticator.bind(this);
        this.namespaceCreator = this.namespaceCreator.bind(this);
        this.collectionGateway = app.get(CollectionGateway);
    }

    async appAuthenticator(socket: Socket, next: any) {
        const appId = socket.handshake.headers["x-app-id"] as string;
        if (!appId) {
            return next(new Error("App Not Authorized"));
        }
        const result = await this.applicationSerivce.verifyApplication(appId)

        this.logger.log(result.name);
        if (result) {
            socket.data.app = result;
            return next();
        }

        next(new Error("App Not Authorized"));
    }

    namespaceCreator(socket: Socket, next: any) {
        this.logger.log(socket.nsp.name);
        this.collectionGateway.createNamespace(socket.nsp.name, socket.nsp);
        return next();
    }

    createIOServer(port: number, options?: ServerOptions) {
        this.logger.debug('Configuring SocketIO Server');

        options = {
            ...options,
            cors: {
                origin: '*',
            }
        }

        const io: Server = super.createIOServer(port, options);
        // io.of(/\w*/).use(this.namespaceCreator);
        io.of(/\w*/).use(this.namespaceCreator);

        return io;
    }


}
