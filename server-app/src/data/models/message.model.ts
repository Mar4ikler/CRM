import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './user.model';

@ObjectType()
export class Message {
    @Prop()
    @Field(() => String)
    text: string;
    @Prop({ type: Types.ObjectId, ref: 'User' })
    @Field(() => User)
    author: User;
    @Prop()
    @Field(() => Date)
    date: Date;
}
