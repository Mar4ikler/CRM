/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model } from 'mongoose';

export class MongoGenericRepository<T> {
    private _repository: Model<T>;
    protected _populatedFields: string[];
    constructor(repository: Model<T>, populatedFields?: string[]) {
        this._repository = repository;
        this._populatedFields = populatedFields;
    }

    updateMany(update: any, filter?: any, options?: any): any {
        return this._repository.updateMany(filter, update, options);
    }

    updateOne(update: any, filter?: any, options?: any): any {
        return this._repository.updateOne(filter, update, options);
    }

    async create(item: any): Promise<T> {
        return this._repository.create(item);
    }

    async createMany(item: any[], options?: any): Promise<any> {
        return this._repository.create(item, options);
    }

    async update(id: string, item: any, session?: any): Promise<T> {
        const options = !session ? { new: true } : { session, new: true };
        return this._repository.findByIdAndUpdate(id, item, options).exec();
    }

    async getMany(filter: any, sort?: any, skip?: any, limit?: any, session?: any): Promise<T[]> {
        return this._repository
            .find(filter, null, { session: session })
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .populate(this._populatedFields)
            .exec();
    }

    async getOne(filter: any, sort?: any, session?: any): Promise<any> {
        return this._repository
            .findOne(filter, null, { session: session })
            .sort(sort)
            .populate(this._populatedFields)
            .exec();
    }

    async delete(id: string, options?: any): Promise<any> {
        return this._repository.findByIdAndDelete(id, options);
    }

    deleteMany(filter: any, options?: any): any {
        return this._repository.deleteMany(filter, options);
    }

    async bulkWrite(bulkWriteOperations: any, options?: any): Promise<any> {
        return this._repository.bulkWrite(bulkWriteOperations, options);
    }

    async count(field: string, filter: any = {}): Promise<number> {
        const countObject = await this._repository.aggregate([
            { $match: filter },
            { $count: field },
        ]);
        const count: number = countObject.length > 0 ? countObject[0][field] : 0;
        return count;
    }
}
