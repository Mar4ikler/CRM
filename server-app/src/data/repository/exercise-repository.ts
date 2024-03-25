import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exercise } from '../models/exercise.model';
import { MongoGenericRepository } from './mongo-generic-repository';

@Injectable()
export class ExerciseRepository extends MongoGenericRepository<Exercise> {
    constructor(@InjectModel(Exercise.name) private exerciseModel: Model<Exercise>) {
        super(exerciseModel);
    }
}
