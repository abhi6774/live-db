import { PrismaService } from "../database";

export default class ApplicationService {

    private prismaService: PrismaService;

    constructor() {
        this.prismaService = PrismaService.getInstance();
    }

    registerApp(appName: string) {
        return this.prismaService.registeredApp.create({
            data: {
                name: appName
            }
        })
    }

    getApps() {
        return this.prismaService.registeredApp.findMany();
    }

    async verifyAppID(appID: string) {
        const app = await this.prismaService.registeredApp.findUnique({
            where: {
                id: appID
            }
        });

        if (app)
            return true;
        return false;
    }
}
