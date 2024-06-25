import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from '../../../data/models/chat.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }])],
    exports: [MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }])],
})
export class ChatFeatureConfigModule {}
