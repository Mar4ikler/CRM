import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TaskStatus } from 'src/common/graphql/types/task-status.enum';
import { Comment } from './comment.model';
import { User } from './user.model';

@Schema({ collection: 'tasksStore', versionKey: false })
@ObjectType()
export class Task {
    @Field(() => String)
    _id: string;
    @Prop({ required: true })
    @Field(() => String)
    name: string;
    @Prop({ required: true })
    @Field(() => String)
    description: string;
    @Prop({ required: true })
    @Field(() => Number)
    price: number;
    @Prop({ required: true })
    @Field(() => Date)
    startDate: Date;
    @Prop({ required: true })
    @Field(() => Date)
    endDate: Date;
    @Prop({ type: [Types.ObjectId], ref: 'User' })
    @Field(() => [User])
    developers: User[];
    @Prop({ type: Types.ObjectId, ref: 'User' })
    @Field(() => User)
    creator: User;
    @Prop({ type: Types.ObjectId, ref: 'User' })
    @Field(() => User)
    client: User;
    @Prop({ required: true, type: String, enum: TaskStatus })
    @Field(() => TaskStatus)
    status: TaskStatus;
    @Prop()
    @Field(() => [Comment], { nullable: true })
    comments: Comment[];
}

export type TaskDocument = HydratedDocument<Task>;
export const TaskSchema = SchemaFactory.createForClass(Task);
