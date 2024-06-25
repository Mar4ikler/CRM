import { Module } from '@nestjs/common';
import { GraphQLConfigModule } from 'src/config/graphql/config.module';
import { MongoConfigModule } from 'src/config/mongo/config.module';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { ChatFeatureConfigModule } from '../config/mongo/features/chat-feature.config.module';
import { ChatRepository } from '../data/repository/chat-repository';
import { PubSub } from 'graphql-subscriptions';
import { UserFeatureConfigModule } from '../config/mongo/features/user-feature.config.module';
import { UserRepository } from '../data/repository/user-repository';

@Module({
    imports: [GraphQLConfigModule, MongoConfigModule, ChatFeatureConfigModule, UserFeatureConfigModule],
    providers: [
        ChatResolver,
        ChatService,
        ChatRepository,
        UserRepository,
        { provide: PubSub, useValue: new PubSub() },
    ],
})
export class ChatModule {}
