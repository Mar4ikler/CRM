import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoGenericRepository } from './mongo-generic-repository';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';

@Injectable()
export class UserRepository extends MongoGenericRepository<User> {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {
        super(userModel);
    }
}
