import crypto from "crypto";
import { Singleton } from "../utils/instancer";

export type Startup = {
    id: string;
    name: string;
    description?: string;
    logo?: string;
    cover?: string;
}

@Singleton
export default class StartUpService {

    private startups = new Map<string, Startup>();


    getAll() {
        return this.startups.values();
    }


    async create(startup: Omit<Startup, "id">): Promise<Startup> {
        const id = crypto.randomBytes(16).toString("hex");
        this.startups.set(id, { ...startup, id });
        return this.startups.get(id) as Startup;
    }

    getOne(id: string) {
        if (this.startups.has(id)) {
            return this.startups.get(id);
        }
        return null;
    }
}
