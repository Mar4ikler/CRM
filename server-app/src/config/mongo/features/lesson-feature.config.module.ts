import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from 'src/data/models/lesson.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }])],
    exports: [MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }])],
})
export class LessonFeatureConfigModule {}
