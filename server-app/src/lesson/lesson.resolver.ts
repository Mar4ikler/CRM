import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { userRoles } from 'src/common/constants/user-roles';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateLessonInput } from 'src/common/graphql/inputs/lesson/create-lesson.input';
import { GetLessonsInput } from 'src/common/graphql/inputs/lesson/get-lessons.input';
import { GetLessonsResponse } from 'src/common/graphql/types/get-lessons.type';
import { Lesson } from 'src/data/models/lesson.model';
import { LessonService } from './lesson.service';

@Resolver()
export class LessonResolver {
    constructor(private readonly lessonService: LessonService) {}

    @Query(() => GetLessonsResponse, { name: 'getLessons' })
    async getLessons(
        @Args('getLessonsInput') getLessonsInput: GetLessonsInput
    ): Promise<GetLessonsResponse> {
        return this.lessonService.getLessons(getLessonsInput);
    }

    @Roles(userRoles.ADMIN)
    @Mutation(() => Lesson, { name: 'createLesson' })
    async createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput
    ): Promise<Lesson> {
        return this.lessonService.createLesson(createLessonInput);
    }

    @Roles(userRoles.ADMIN)
    @Mutation(() => Lesson, { name: 'deleteLesson', nullable: true })
    async deleteLesson(@Args('lessonId') lessonId: string): Promise<Lesson> {
        return this.lessonService.deleteExercise(lessonId);
    }
}
