import { Args, Context, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Message } from '../data/models/message.model';
import { Inject, UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { UserRole } from '../common/graphql/types/user-role.enum';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RoleGuard } from '../common/guards/role.guard';
import { JwtValidatedOutput } from '../common/interfaces/jwt';
import { Chat } from '../data/models/chat.model';
import { GetChatsInput } from '../common/graphql/inputs/chat/get-chats.input';
import { SendMessagetInput } from '../common/graphql/inputs/chat/send-message.input';

@Resolver()
export class ChatResolver {
    constructor(
        private readonly chatService: ChatService,
        @Inject(PubSub) private readonly pubSub: PubSub
    ) {}

    @Subscription(() => Message, {
        name: 'newMessage',
        // filter: (payload, variables) =>
        //     variables.deviceIds.split(',').find((item) => item === payload.deviceUpdated._id),
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    subscribeToChangeDevice(): any {
        return this.pubSub.asyncIterator('newMessage');
    }

    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.DEVELOPER, UserRole.CLIENT)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Mutation(() => Message, { name: 'sendMessage' })
    async sendMessage(
        @Args('sendMessagetInput') sendMessagetInput: SendMessagetInput,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        @Context() context
    ): Promise<Message> {
        const client: JwtValidatedOutput = context.req.user as JwtValidatedOutput;
        const message = await this.chatService.sendMessage(
            sendMessagetInput.text,
            sendMessagetInput.receiverId,
            client.userId
        );
        await this.pubSub.publish('newMessage', { newMessage: message });
        return message;
    }

    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.DEVELOPER, UserRole.CLIENT)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Query(() => [Chat], { name: 'getChats' })
    async getChats(
        @Args('getChatsInput') getChatsInput: GetChatsInput,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        @Context() context
    ): Promise<Chat[]> {
        const client: JwtValidatedOutput = context.req.user as JwtValidatedOutput;
        const chats = await this.chatService.getChats(getChatsInput, client.userId);
        return chats;
    }
}
