import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.database";

@Injectable()
export class ApplicationService {

    constructor(private prismaService: PrismaService) { }

    async getAllApplications() {
        return this.prismaService.registeredApp.findMany();
    }

    verifyApplication(appId: string) {
        return this.prismaService.registeredApp.findUnique({ where: { id: appId } });
    }

    async registerApplication(appName: string, description?: string) {
        const app = await this.prismaService.registeredApp.create({ data: { name: appName, description, url: "" } });
        return app;
    }

    async deleteApplication(appId: string) {
        const app = await this.prismaService.registeredApp.delete({ where: { id: appId } });
        return app;
    }
}
