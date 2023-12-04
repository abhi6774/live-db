import { PrismaClient } from "@prisma/client";
import { MongoClient } from "mongodb";


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



export class MongoDatabase extends MongoClient {
    private static instance: MongoDatabase;

    constructor(mongoUrl: string) {
        super(mongoUrl);
    }

    async connect(): Promise<this> {
        console.log("Connecting to MongoDB database...");
        await super.connect();
        return this;
    }

    async disconnect(): Promise<void> {
        console.log("Disconnecting from MongoDB database...");
        await super.close();
    }

    static getInstance(mongoUrl: string) {
        if (!this.instance) {
            this.instance = new MongoDatabase(mongoUrl);
        }
        return this.instance;
    }
}

export async function initMongoDatabase() {
    const mongoUrl = process.env.DATABASE_URL_ROOT as string;
    const mongoDatabase = MongoDatabase.getInstance(mongoUrl);
    await mongoDatabase.connect();
    return mongoDatabase;
}

