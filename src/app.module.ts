import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationController } from './applications/applications.controller';
import { ApplicationService } from './applications/services/applications.service';
import { PrismaService } from './database/prisma.database';
import { CollectionGateway } from './socketer/collection/collection.gateway';
import { CollectionService } from './socketer/collection/services/collection.service';
import { MessagesGateway } from './socketer/messages/messages.gateway';
import { MessageService } from './socketer/messages/services/messages.service';

@Module({
  imports: [],
  controllers: [AppController, ApplicationController],
  providers: [AppService, PrismaService, ApplicationService, MessagesGateway, MessageService, CollectionGateway, CollectionService],
})
export class AppModule { }
