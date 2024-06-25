import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoGenericRepository } from './mongo-generic-repository';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from '../models/chat.model';

@Injectable()
export class ChatRepository extends MongoGenericRepository<Chat> {
    constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {
        super(chatModel, ['messages.author', 'participants']);
    }
}
