/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { BcryptCryptographyService } from 'src/authentication/cryptography/bcrypt-cryptography-service';
import { userRoles } from 'src/common/constants/user-roles';
import { BlockUserInput } from 'src/common/graphql/inputs/user/block-user.input';
import { CreateUserInput } from 'src/common/graphql/inputs/user/create-user.input';
import { GetUsersInput } from 'src/common/graphql/inputs/user/get-users.input';
import { UpdateUserInput } from 'src/common/graphql/inputs/user/update-user.input';
import { GetUsersResponse } from 'src/common/graphql/types/get-users.type';
import { UserRole } from 'src/common/graphql/types/user-role.enum';
import { convertStringToObjectId } from 'src/common/helpers/convert-string-to-ObjectId';
import { CreateUserFields } from 'src/common/interfaces/create-user-fields';
import { User } from 'src/data/models/user.model';
import { UserRepository } from 'src/data/repository/user-repository';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private cryptographyService: BcryptCryptographyService
    ) {}

    async getUsers(getUsersInput: GetUsersInput): Promise<GetUsersResponse> {
        const regex = new RegExp(getUsersInput.filterString, 'i');
        const filter = {
            $and: [
                {
                    $or: [{ login: { $regex: regex } }, { fullName: { $regex: regex } }],
                },
                { isDeleted: false },
            ],
        };
        const count: number = await this.userRepository.count('login', filter);
        const skip = Math.max(getUsersInput.skip, 0);
        const limit = getUsersInput.limit <= 0 ? null : getUsersInput.limit;
        const users = await this.userRepository.getMany(filter, null, skip, limit);
        return {
            users,
            count,
        };
    }

    async getUser(userId: string): Promise<User> {
        return this.userRepository.getOne({ _id: convertStringToObjectId(userId) });
    }

    async createUser(createUserInput: CreateUserInput): Promise<User> {
        const { password: _, isAdmin: __, ...setUser } = createUserInput;
        const user = await this.userRepository.getOne({
            $and: [{ $or: [{ email: setUser.email }] }, { isDeleted: false }],
        });
        if (user != null) {
            throw new BadRequestException('Такой пользователь уже существует');
        }
        const userFields: CreateUserFields = {
            ...setUser,
            passwordHash: await this.cryptographyService.encryptPassword(createUserInput.password),
            isDeleted: false,
            isBlocked: false,
            role: createUserInput.isAdmin ? UserRole.ADMIN : UserRole.USER,
            registrationDate: new Date().getTime(),
            avatar: '',
            favorites: [],
        };
        try {
            const user = await this.userRepository.create(userFields);
            return user;
        } catch (e) {
            throw new BadRequestException('Ошибка создания пользователя');
        }
    }

    async deleteUser(userId: string): Promise<User> {
        try {
            const updateFields = {
                isDeleted: true,
            };
            const filter = { _id: convertStringToObjectId(userId) };
            await this.userRepository.updateOne(updateFields, filter);
            return await this.userRepository.getOne(filter);
        } catch (e) {
            throw new BadRequestException('Ошибка удаления пользователя');
        }
    }

    async blockUser(blockUserInput: BlockUserInput): Promise<User> {
        try {
            const updateFields = {
                isBlocked: blockUserInput.isBlocked,
            };
            const filter = { _id: convertStringToObjectId(blockUserInput._id) };
            await this.userRepository.updateOne(updateFields, filter);
            return await this.userRepository.getOne(filter);
        } catch (e) {
            throw new BadRequestException('Ошибка блокировки пользователя');
        }
    }
}
