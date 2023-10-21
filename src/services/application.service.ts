import { PrismaClient } from "@prisma/client";
export default class ApplicationService {

    constructor(private prisma: PrismaClient) { }
}
