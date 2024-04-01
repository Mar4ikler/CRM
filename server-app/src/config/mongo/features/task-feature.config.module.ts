import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/data/models/task.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
    exports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
})
export class TaskFeatureConfigModule {}
