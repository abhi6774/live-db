import { PrismaClient } from "@prisma/client";


export class PrismaService extends PrismaClient {
    private static instance: PrismaService;

    static getInstance() {
        if (!this.instance) {
            this.instance = new PrismaService();
        }
        return this.instance;
    }

    $connect(): Promise<void> {
        console.log("Connecting to mongodb database...");
        return super.$connect();
    }

    $disconnect(): Promise<void> {
        console.log("Disconnecting from mongodb database...");
        return super.$disconnect();
    }
}

export async function initPrisma() {
    const prisma = PrismaService.getInstance();
    await prisma.$connect();
    return prisma;
}
