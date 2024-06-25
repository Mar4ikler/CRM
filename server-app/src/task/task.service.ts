/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
            (item) =>
                item.creator._id.toString() === clientId ||
                item.developers[0]._id.toString() === clientId ||
                item.client._id.toString() === clientId
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

    async deleteTask(taskId: string): Promise<Task> {
        const task = await this.taskRepository.delete(taskId);
        return task;
    }
}
