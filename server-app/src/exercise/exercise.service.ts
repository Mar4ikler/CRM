import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExerciseInput } from 'src/common/graphql/inputs/exercise/create-exercise.input';
import { GetExerciseInput } from 'src/common/graphql/inputs/exercise/get-exercises.input';
import { GetExercisesResponse } from 'src/common/graphql/types/get-exercises.type';
import { Exercise } from 'src/data/models/exercise.model';
import { ExerciseRepository } from 'src/data/repository/exercise-repository';

@Injectable()
export class ExerciseService {
    constructor(private exerciseRepository: ExerciseRepository) {}

    async getExercises(getExerciseInput: GetExerciseInput): Promise<GetExercisesResponse> {
        const regex = new RegExp(getExerciseInput.filterString, 'i');
        const filter = {
            name: { $regex: regex },
        };
        const count: number = await this.exerciseRepository.count('name', filter);
        const skip = Math.max(getExerciseInput.skip, 0);
        const limit = getExerciseInput.limit <= 0 ? null : getExerciseInput.limit;
        const exercises = await this.exerciseRepository.getMany(filter, null, skip, limit);
        return {
            exercises,
            count,
        };
    }

    async createExercise(createExerciseInput: CreateExerciseInput): Promise<Exercise> {
        try {
            const exercise = await this.exerciseRepository.create(createExerciseInput);
            return exercise;
        } catch (e) {
            throw new BadRequestException('Ошибка создания упражнения');
        }
    }

    async deleteExercise(exerciseId: string): Promise<Exercise> {
        return this.exerciseRepository.delete(exerciseId);
    }
}
