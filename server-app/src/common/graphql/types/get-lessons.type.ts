import { Field, ObjectType } from '@nestjs/graphql';
import { Lesson } from 'src/data/models/lesson.model';

@ObjectType()
export class GetLessonsResponse {
    @Field(() => [Lesson])
    exercises: Lesson[];
    @Field(() => Number)
    count: number;
}
