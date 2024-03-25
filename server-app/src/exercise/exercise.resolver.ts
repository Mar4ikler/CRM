import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { userRoles } from 'src/common/constants/user-roles';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateExerciseInput } from 'src/common/graphql/inputs/exercise/create-exercise.input';
import { GetExerciseInput } from 'src/common/graphql/inputs/exercise/get-exercises.input';
import { GetExercisesResponse } from 'src/common/graphql/types/get-exercises.type';
import { Exercise } from 'src/data/models/exercise.model';
import { ExerciseService } from './exercise.service';

@Resolver()
export class ExerciseResolver {
    constructor(private readonly exerciseService: ExerciseService) {}

    @Query(() => GetExercisesResponse, { name: 'getExercises' })
    async getExercises(
        @Args('getExerciseInput') getExerciseInput: GetExerciseInput
    ): Promise<GetExercisesResponse> {
        return this.exerciseService.getExercises(getExerciseInput);
    }

    @Roles(userRoles.ADMIN)
    @Mutation(() => Exercise, { name: 'createExercise' })
    async createExercise(
        @Args('createExerciseInput') createExerciseInput: CreateExerciseInput
    ): Promise<Exercise> {
        return this.exerciseService.createExercise(createExerciseInput);
    }

    @Roles(userRoles.ADMIN)
    @Mutation(() => Exercise, { name: 'deleteExercise', nullable: true })
    async deleteExercise(@Args('exerciseId') exerciseId: string): Promise<Exercise> {
        return this.exerciseService.deleteExercise(exerciseId);
    }
}
