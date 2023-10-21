export type Startup = {
    id: string;
    name: string;
    description?: string;
    logo?: string;
    cover?: string;
}


export default class StartUpService {

    private startups = new Map<string, Startup>();
    private static instance: StartUpService;

    static getInstance() {
        if (!this.instance) {
            this.instance = new StartUpService();
        }
        return this.instance;
    }


    getAll() {
        return this.startups.values();
    }


    create(startup: Startup) {
        this.startups.set(startup.id, startup);
    }

    getOne(id: string) {
        if (this.startups.has(id)) {
            return this.startups.get(id);
        }
        return null;
    }
}
