import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLessonInput } from 'src/common/graphql/inputs/lesson/create-lesson.input';
import { GetLessonsInput } from 'src/common/graphql/inputs/lesson/get-lessons.input';
import { GetLessonsResponse } from 'src/common/graphql/types/get-lessons.type';
import { Lesson } from 'src/data/models/lesson.model';
import { LessonRepository } from 'src/data/repository/lesson-repository';

@Injectable()
export class LessonService {
    constructor(private lessonRepository: LessonRepository) {}

    async getLessons(getLessonsInput: GetLessonsInput): Promise<GetLessonsResponse> {
        const regex = new RegExp(getLessonsInput.filterString, 'i');
        const filter = {
            name: { $regex: regex },
        };
        const count: number = await this.lessonRepository.count('name', filter);
        const skip = Math.max(getLessonsInput.skip, 0);
        const limit = getLessonsInput.limit <= 0 ? null : getLessonsInput.limit;
        const exercises = await this.lessonRepository.getMany(filter, null, skip, limit);
        return {
            exercises,
            count,
        };
    }

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        try {
            const exercise = await this.lessonRepository.create(createLessonInput);
            return exercise;
        } catch (e) {
            throw new BadRequestException('Ошибка создания упражнения');
        }
    }

    async deleteExercise(lessonId: string): Promise<Lesson> {
        return this.lessonRepository.delete(lessonId);
    }
}
