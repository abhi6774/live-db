import { NextFunction, Request, Response } from "express";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { ApplicationService } from "../services";

type SocketNextFunction = (err?: ExtendedError | undefined) => void;

export default class ApplicationMiddleWare {

    constructor(private applicationService: ApplicationService) { }

    async expressMiddleware(req: Request, res: Response, next: NextFunction) {
        try {
            const appId = req.headers["app-id"] as string
            if (appId) {
                const exists = await this.applicationService.verifyAppID(appId);
                if (exists) {
                    next();
                }
            }
            next("FORBIDDEN, Wrong app Not allowed");
        } catch (error) {
            next(error);
        }
    }

    async socketIOMiddleware(socket: Socket, next: SocketNextFunction) {
        const appID = socket.handshake.headers["app-id"] as string;

        if (await this.applicationService.verifyAppID(appID)) {
            next();
        }
        next(new Error("FORBIDDEN, Wrong app Not allowed"));
    }
}
