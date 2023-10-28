import { Singleton } from "./instancer";

@Singleton
export default class Logger {
    mode: "DEVELOPMENT" | "PRODUCTION";

    constructor() {
        this.mode = process.env["MODE"] as "DEVELOPMENT" | "PRODUCTION";
    }

    log(...args: any[]) {
        if (process.env["MODE"] === "DEVELOPMENT")
            console.log(...args);
    }
}
