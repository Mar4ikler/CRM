import { Field, ObjectType } from '@nestjs/graphql';
import { Exercise } from 'src/data/models/exercise.model';

@ObjectType()
export class GetExercisesResponse {
    @Field(() => [Exercise])
    exercises: Exercise[];
    @Field(() => Number)
    count: number;
}
