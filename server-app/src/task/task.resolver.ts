/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtValidatedOutput } from 'src/common/interfaces/jwt';
import { UserRole } from 'src/common/graphql/types/user-role.enum';
import { TaskService } from './task.service';
import { GetTasksResponse } from 'src/common/graphql/types/get-tasks.type';
import { GetTasksInput } from 'src/common/graphql/inputs/task/get-tasks.input';
import { Task } from 'src/data/models/task.model';
import { CreateTaskInput } from 'src/common/graphql/inputs/task/create-task.input';
import { CreateCommentInput } from 'src/common/graphql/inputs/task/create-comment.input';

@Resolver()
export class TaskResolver {
    constructor(private readonly taskService: TaskService) {}

    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.DEVELOPER, UserRole.CLIENT)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Query(() => GetTasksResponse, { name: 'getTasks' })
    async getTasks(
        @Args('getTasksInput') getTasksInput: GetTasksInput,
        @Context() context
    ): Promise<GetTasksResponse> {
        const client: JwtValidatedOutput = context.req.user as JwtValidatedOutput;
        return this.taskService.getTasks(getTasksInput, client.userId);
    }

    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Mutation(() => Task, { name: 'createTask' })
    async createTask(
        @Args('createTaskInput') createTaskInput: CreateTaskInput,
        @Context() context
    ): Promise<Task> {
        const client: JwtValidatedOutput = context.req.user as JwtValidatedOutput;
        return this.taskService.createTask(createTaskInput, client.userId);
    }

    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.DEVELOPER, UserRole.CLIENT)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Mutation(() => Task, { name: 'createComment' })
    async createComment(
        @Args('createCommentInput') createCommentInput: CreateCommentInput,
        @Context() context
    ): Promise<Task> {
        const client: JwtValidatedOutput = context.req.user as JwtValidatedOutput;
        return this.taskService.createComment(createCommentInput, client.userId);
    }

    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.DEVELOPER)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Query(() => Task, { name: 'getTask' })
    async getTask(@Args('taskId') taskId: string): Promise<Task> {
        return this.taskService.getTask(taskId);
    }

    @Roles(UserRole.MANAGER)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Mutation(() => Task, { name: 'deleteTask' })
    async deleteTask(@Args('taskId') taskId: string): Promise<Task> {
        return this.taskService.deleteTask(taskId);
    }
}
