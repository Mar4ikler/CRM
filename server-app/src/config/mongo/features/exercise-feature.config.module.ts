import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from 'src/data/models/exercise.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: Exercise.name, schema: ExerciseSchema }])],
    exports: [MongooseModule.forFeature([{ name: Exercise.name, schema: ExerciseSchema }])],
})
export class ExerciseFeatureConfigModule {}
