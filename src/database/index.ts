import { PrismaClient } from "@prisma/client";

export async function initPrisma() {
    const prisma = new PrismaClient();

    await prisma.$connect();

    console.log("Prisma connected");

    return prisma;
}
