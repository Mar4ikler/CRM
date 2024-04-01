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

    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Query(() => GetTasksResponse, { name: 'getTasks' })
    async getTasks(
        @Args('getTasksInput') getTasksInput: GetTasksInput,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        @Context() context
    ): Promise<Task> {
        const client: JwtValidatedOutput = context.req.user as JwtValidatedOutput;
        return this.taskService.createComment(createCommentInput, client.userId);
    }

    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Query(() => Task, { name: 'getTask' })
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getTask(@Args('taskId') taskId: string): Promise<Task> {
        return this.taskService.getTask(taskId);
    }

    // @Roles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RoleGuard)
    // @Query(() => GetUsersResponse, { name: 'getUsers' })
    // async getUsers(
    //     @Args('getUsersInput') getUsersInput: GetUsersInput,
    //     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    //     @Context() context
    // ): Promise<GetUsersResponse> {
    //     const client: JwtValidatedOutput = context.req.user as JwtValidatedOutput;
    //     return this.userService.getUsers(getUsersInput, client.userId);
    // }

    // @Roles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RoleGuard)
    // @Query(() => User, { name: 'getUser' })
    // // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    // async getUser(@Context() context): Promise<User> {
    //     const user: JwtValidatedOutput = context.req.user as JwtValidatedOutput;
    //     return this.userService.getUser(user.userId);
    // }

    // @Roles(UserRole.ADMIN, UserRole.MANAGER)
    // @UseGuards(JwtAuthGuard, RoleGuard)
    // @Mutation(() => User, { name: 'createUser' })
    // async createUser(
    //     @Args('createUserInput') createUserInput: CreateUserInput,
    //     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    //     @Context() context
    // ): Promise<User> {
    //     const client: JwtValidatedOutput = context.req.user as JwtValidatedOutput;
    //     if (!isValidSetUserRole(client.role, createUserInput.role))
    //         throw new BadRequestException(
    //             'У вас недостаточно прав для создания пользователя данной роли'
    //         );
    //     return this.userService.createUser(createUserInput);
    // }

    // @Roles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RoleGuard)
    // @Mutation(() => User, { name: 'deleteUser' })
    // // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    // async deleteUser(@Args('userId') userId: string, @Context() context): Promise<User> {
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //     const user: JwtValidatedOutput = context.req.user;
    //     if (user.userId === userId)
    //         throw new BadRequestException('Вы не можете удалить самого себя');
    //     return this.userService.deleteUser(userId);
    // }

    // @Roles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RoleGuard)
    // @Mutation(() => User, { name: 'blockUser', nullable: true })
    // async blockUser(
    //     @Args('blockUserInput') blockUserInput: BlockUserInput,
    //     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    //     @Context() context
    // ): Promise<User> {
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //     const user: JwtValidatedOutput = context.req.user;
    //     if (user.userId === blockUserInput._id)
    //         throw new BadRequestException('Вы не можете заблокировать самого себя');
    //     return this.userService.blockUser(blockUserInput);
    // }

    // @Roles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RoleGuard)
    // @Mutation(() => User, { name: 'updateUser' })
    // async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
    //     return this.userService.updateUser(updateUserInput);
    // }
}
