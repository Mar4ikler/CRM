import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MediaObject } from 'src/common/graphql/types/media-object.type';

@Schema({ collection: 'lessonsStore', versionKey: false })
@ObjectType()
export class Lesson {
    @Field(() => String)
    _id: string;
    @Prop({ required: true, unique: true })
    @Field(() => String)
    name: string;
    @Prop({ required: true })
    @Field(() => String)
    description: string;
    @Prop({ required: true })
    @Field(() => [MediaObject])
    images: MediaObject[];
}

export type LessonDocument = HydratedDocument<Lesson>;
export const LessonSchema = SchemaFactory.createForClass(Lesson);
