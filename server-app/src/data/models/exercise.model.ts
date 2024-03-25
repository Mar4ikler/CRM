import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MediaObject } from 'src/common/graphql/types/media-object.type';

@Schema({ collection: 'exercisesStore', versionKey: false })
@ObjectType()
export class Exercise {
    @Field(() => String)
    _id: string;
    @Prop({ required: true, unique: true })
    @Field(() => String)
    name: string;
    @Prop({ required: true })
    @Field(() => Number)
    difficaulty: number;
    @Prop({ required: true })
    @Field(() => String)
    description: string;
    @Prop({ required: true })
    @Field(() => [MediaObject])
    images: MediaObject[];
    @Prop({ required: true })
    @Field(() => [MediaObject])
    videos: MediaObject[];
}

export type ExerciseDocument = HydratedDocument<Exercise>;
export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
