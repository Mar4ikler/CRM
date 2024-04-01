import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './user.model';

@ObjectType()
export class Comment {
    @Prop()
    @Field(() => String)
    _id: string;
    @Prop()
    @Field(() => String)
    text: string;
    @Prop({ type: Types.ObjectId, ref: 'User' })
    @Field(() => User)
    user: User;
    @Prop()
    @Field(() => Date)
    date: Date;
}
