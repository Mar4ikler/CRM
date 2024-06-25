/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { ChatRepository } from '../data/repository/chat-repository';
import { Message } from '../data/models/message.model';
import { Chat } from '../data/models/chat.model';
import { convertStringToObjectId } from '../common/helpers/convert-string-to-ObjectId';
import { UserRepository } from '../data/repository/user-repository';
import { GetChatsInput } from '../common/graphql/inputs/chat/get-chats.input';

@Injectable()
export class ChatService {
    constructor(
        private chatRepository: ChatRepository,
        private userRepository: UserRepository
    ) {}

    async sendMessage(text: string, receiverId: string, clientId: string): Promise<Message> {
        try {
            const chat: Chat = await this.chatRepository.getOne({
                participants: {
                    $all: [convertStringToObjectId(receiverId), convertStringToObjectId(clientId)],
                },
            });
            const author = await this.userRepository.getOne({
                _id: convertStringToObjectId(clientId),
            });
            const newMessage: Message = {
                text: text,
                author: author,
                date: new Date(),
            };
            if (chat) {
                await this.chatRepository.update(chat._id, {
                    $push: {
                        messages: newMessage,
                    },
                });
            } else {
                await this.chatRepository.create({
                    participants: [
                        convertStringToObjectId(receiverId),
                        convertStringToObjectId(clientId),
                    ],
                    messages: [newMessage],
                });
            }
            return newMessage;
        } catch (e) {
            throw new BadRequestException('Ошибка создания сообщения');
        }
    }

    async getChats(getChatsInput: GetChatsInput, clientId: string): Promise<Chat[]> {
        try {
            const filter = {
                participants: {
                    $in: [convertStringToObjectId(clientId)],
                },
            };
            const skip = Math.max(getChatsInput.skip, 0);
            const limit = getChatsInput.limit <= 0 ? null : getChatsInput.limit;
            return await this.chatRepository.getMany(filter, null, skip, limit);
        } catch (e) {
            throw new BadRequestException('Ошибка получения чата чата');
        }
    }
}
