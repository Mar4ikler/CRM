import { Types } from 'mongoose';

export const convertStringToObjectId = (inputString: string): Types.ObjectId => {
    return new Types.ObjectId(inputString);
};
