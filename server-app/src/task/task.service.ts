/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentInput } from 'src/common/graphql/inputs/task/create-comment.input';
import { CreateTaskInput } from 'src/common/graphql/inputs/task/create-task.input';
import { GetTasksInput } from 'src/common/graphql/inputs/task/get-tasks.input';
import { GetTasksResponse } from 'src/common/graphql/types/get-tasks.type';
import { convertStringToObjectId } from 'src/common/helpers/convert-string-to-ObjectId';
import { Comment } from 'src/data/models/comment.model';
import { Task } from 'src/data/models/task.model';
import { TaskRepository } from 'src/data/repository/task-repository';
import { UserRepository } from 'src/data/repository/user-repository';

@Injectable()
export class TaskService {
    constructor(
        private taskRepository: TaskRepository,
        private userRepository: UserRepository
    ) {}

    async getTasks(getTasksInput: GetTasksInput, clientId: string): Promise<GetTasksResponse> {
        const regex = new RegExp(getTasksInput.filterString, 'i');
        const filter = {
            name: { $regex: regex },
        };
        const count: number = await this.taskRepository.count('name', filter);
        const skip = Math.max(getTasksInput.skip, 0);
        const limit = getTasksInput.limit <= 0 ? null : getTasksInput.limit;
        const tasks = (await this.taskRepository.getMany(filter, null, skip, limit)).filter(
            (item) => item.creator._id.toString() === clientId
        );
        let newComments = [];
        for (const item of tasks) {
            for (const comment of item.comments) {
                const owner = await this.userRepository.getOne({
                    _id: convertStringToObjectId(comment.user._id),
                });
                newComments.push({
                    text: comment.text,
                    date: comment.date,
                    user: owner,
                });
            }
            item.comments = newComments;
            newComments = [];
        }
        return {
            tasks,
            count,
        };
    }

    async createTask(createTaskInput: CreateTaskInput, clientId: string): Promise<Task> {
        const taskFields = {
            ...createTaskInput,
            creator: convertStringToObjectId(clientId),
            comments: [],
        };
        try {
            const task = await this.taskRepository.create(taskFields);
            return task;
        } catch (e) {
            throw new BadRequestException('Ошибка создания задачи');
        }
    }

    async createComment(createCommentInput: CreateCommentInput, clientId: string): Promise<Task> {
        const { taskId, ...commentInfo } = createCommentInput;
        const commentFields = {
            ...commentInfo,
            user: convertStringToObjectId(clientId),
        };
        try {
            await this.taskRepository.update(taskId, {
                $push: { comments: commentFields },
            });
            const task = await this.taskRepository.getOne({ _id: convertStringToObjectId(taskId) });
            const newComments = [];
            for (const item of task.comments) {
                const owner = await this.userRepository.getOne({
                    _id: convertStringToObjectId(item.user._id),
                });
                newComments.push({
                    text: item.text,
                    date: item.date,
                    user: owner,
                });
            }
            task.comments = newComments;
            return task;
        } catch (e) {
            throw new BadRequestException('Ошибка создания комментария');
        }
    }

    async getTask(taskId: string): Promise<Task> {
        const task = await this.taskRepository.getOne({ _id: convertStringToObjectId(taskId) });
        const newComments = [];
        for (const item of task.comments) {
            const owner = await this.userRepository.getOne({
                _id: convertStringToObjectId(item.user._id),
            });
            newComments.push({
                text: item.text,
                date: item.date,
                user: owner,
            });
        }
        task.comments = newComments;
        return task;
    }

    // async getUsers(getUsersInput: GetUsersInput, clientId: string): Promise<GetUsersResponse> {
    //     const regex = new RegExp(getUsersInput.filterString, 'i');
    //     const filter = {
    //         $and: [
    //             {
    //                 nickname: { $regex: regex },
    //             },
    //             { isDeleted: false },
    //         ],
    //     };
    //     const count: number = await this.userRepository.count('nickname', filter);
    //     const skip = Math.max(getUsersInput.skip, 0);
    //     const limit = getUsersInput.limit <= 0 ? null : getUsersInput.limit;
    //     const users = (await this.userRepository.getMany(filter, null, skip, limit)).filter(
    //         (item) => item._id.toString() !== clientId
    //     );
    //     return {
    //         users,
    //         count,
    //     };
    // }

    // async getUser(userId: string): Promise<User> {
    //     return this.userRepository.getOne({ _id: convertStringToObjectId(userId) });
    // }

    // async createUser(createUserInput: CreateUserInput): Promise<User> {
    //     const { password: _, ...setUser } = createUserInput;
    //     const user = await this.userRepository.getOne({
    //         $and: [{ nickname: setUser.nickname }, { isDeleted: false }],
    //     });
    //     if (user != null) {
    //         throw new BadRequestException('Такой пользователь уже существует');
    //     }
    //     const userFields: CreateUserFields = {
    //         ...setUser,
    //         passwordHash: await this.cryptographyService.encryptPassword(createUserInput.password),
    //         isDeleted: false,
    //         isBlocked: false,
    //         role: createUserInput.role,
    //         avatar: '',
    //     };
    //     try {
    //         const user = await this.userRepository.create(userFields);
    //         return user;
    //     } catch (e) {
    //         throw new BadRequestException('Ошибка создания пользователя');
    //     }
    // }

    // async deleteUser(userId: string): Promise<User> {
    //     try {
    //         const updateFields = {
    //             isDeleted: true,
    //         };
    //         const filter = { _id: convertStringToObjectId(userId) };
    //         await this.userRepository.updateOne(updateFields, filter);
    //         return await this.userRepository.getOne(filter);
    //     } catch (e) {
    //         throw new BadRequestException('Ошибка удаления пользователя');
    //     }
    // }

    // async blockUser(blockUserInput: BlockUserInput): Promise<User> {
    //     try {
    //         const updateFields = {
    //             isBlocked: blockUserInput.isBlocked,
    //         };
    //         const filter = { _id: convertStringToObjectId(blockUserInput._id) };
    //         await this.userRepository.updateOne(updateFields, filter);
    //         return await this.userRepository.getOne(filter);
    //     } catch (e) {
    //         throw new BadRequestException('Ошибка блокировки пользователя');
    //     }
    // }

    // async updateUser(updateUserInput: UpdateUserInput): Promise<User> {
    //     try {
    //         const filter = { _id: convertStringToObjectId(updateUserInput._id) };
    //         await this.userRepository.updateOne(updateUserInput, filter);
    //         return await this.userRepository.getOne(filter);
    //     } catch (e) {
    //         throw new BadRequestException('Такой пользователь уже существует');
    //     }
    // }
}
