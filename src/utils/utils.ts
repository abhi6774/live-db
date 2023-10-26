import { Express, NextFunction, Router } from "express";

export interface RouterOptions {
    path: string,
    router: Router
}

export interface MiddlewareOptions {
    routers: Router[],
    middleware: (req: any, res: any, next: NextFunction) => void
}

export function setRouters(routers: RouterOptions[], app: Express) {
    routers.forEach(router => {
        app.use(router.path, router.router);
    });
}


export function setMiddleWare(options: MiddlewareOptions[]) {
    options.forEach((option) => {
        option.routers.forEach(router => {
            router.use(option.middleware);
        });
    })
}
