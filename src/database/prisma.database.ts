import type { INestApplication } from '@nestjs/common';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger('PrismaService');


    async onModuleInit() {
        await this.$connect();
    }

}
