import { RouterOptions } from "../utils/utils";
import ApplicationRouter from "./application.router";
import StartUpRouter from "./startup.router";

export {
    ApplicationRouter,
    StartUpRouter
};

const routers: RouterOptions[] = [
    { path: "/application", router: ApplicationRouter },
    { path: "/startup", router: StartUpRouter }
]
export default routers;
