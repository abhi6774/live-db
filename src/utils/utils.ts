import { Express, NextFunction, Router } from "express";


export interface ErrorMessage {
    message: string | null
}

export interface RouterOptions {
    path: string,
    router: Router
}

export interface RouterMiddlewareOptions {
    routers: Router[],
    middleware: (req: any, res: any, next: NextFunction) => void
}

export function setRouters(routers: RouterOptions[], app: Express) {
    routers.forEach(router => {
        app.use(router.path, router.router);
    });
}


export function setMiddleWare(options: RouterMiddlewareOptions[]) {
    options.forEach((option) => {
        option.routers.forEach(router => {
            router.use(option.middleware);
        });
    })
}
