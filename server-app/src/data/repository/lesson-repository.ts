import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson } from '../models/lesson.model';
import { MongoGenericRepository } from './mongo-generic-repository';

@Injectable()
export class LessonRepository extends MongoGenericRepository<Lesson> {
    constructor(@InjectModel(Lesson.name) private lessonModel: Model<Lesson>) {
        super(lessonModel);
    }
}
