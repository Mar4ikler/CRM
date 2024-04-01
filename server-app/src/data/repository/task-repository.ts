import { Injectable } from '@nestjs/common';
import { MongoGenericRepository } from './mongo-generic-repository';
import { Task } from '../models/task.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TaskRepository extends MongoGenericRepository<Task> {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {
        super(taskModel, ['creator', 'developers', 'client', 'comments.user']);
    }
}
