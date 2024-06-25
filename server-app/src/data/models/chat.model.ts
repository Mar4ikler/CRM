import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Message } from './message.model';
import { User } from './user.model';

@Schema({ collection: 'chatsStore', versionKey: false })
@ObjectType()
export class Chat {
    @Field(() => String)
    _id: string;
    @Prop({ type: [Types.ObjectId], ref: 'User' })
    @Field(() => [User], { nullable: true })
    participants: User[];
    @Prop()
    @Field(() => [Message], { nullable: true })
    messages: Message[];
}

export type ChatDocument = HydratedDocument<Chat>;
export const ChatSchema = SchemaFactory.createForClass(Chat);
