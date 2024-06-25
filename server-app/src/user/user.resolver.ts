import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/common/decorators/roles.decorator';
import { GetUsersInput } from 'src/common/graphql/inputs/user/get-users.input';
import { GetUsersResponse } from 'src/common/graphql/types/get-users.type';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtValidatedOutput } from 'src/common/interfaces/jwt';
import { User } from 'src/data/models/user.model';
import { UserService } from './user.service';
import { CreateUserInput } from 'src/common/graphql/inputs/user/create-user.input';
import { BlockUserInput } from 'src/common/graphql/inputs/user/block-user.input';
import { UserRole } from 'src/common/graphql/types/user-role.enum';
import { isValidSetUserRole } from 'src/common/helpers/is-valid-set-user-role';
import { UpdateUserInput } from 'src/common/graphql/inputs/user/update-user.input';
import { EmailNotificationService } from '../email/email.service';
import { EmailNotificationParams } from '../common/interfaces/emailNotificationParams';

@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly emailNotificationService: EmailNotificationService
    ) {}

    @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.DEVELOPER, UserRole.CLIENT)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Query(() => GetUsersResponse, { name: 'getUsers' })
    async getUsers(
        @Args('getUsersInput') getUsersInput: GetUsersInput,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        @Context() context
    ): Promise<GetUsersResponse> {
        const client: JwtValidatedOutput = context.req.user as JwtValidatedOutput;
        return this.userService.getUsers(getUsersInput, client.userId);
    }

    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Query(() => User, { name: 'getUser' })
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getUser(@Args('userId') userId: string): Promise<User> {
        return this.userService.getUser(userId);
    }

    // @Roles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RoleGuard)
    // @Query(() => User, { name: 'getUser' })
    // // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    // async getUser(@Context() context): Promise<User> {
    //     const user: JwtValidatedOutput = context.req.user as JwtValidatedOutput;
    //     return this.userService.getUser(user.userId);
    // }

    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Mutation(() => User, { name: 'createUser' })
    async createUser(
        @Args('createUserInput') createUserInput: CreateUserInput,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        @Context() context
    ): Promise<User> {
        const client: JwtValidatedOutput = context.req.user as JwtValidatedOutput;
        if (!isValidSetUserRole(client.role, createUserInput.role))
            throw new BadRequestException(
                'У вас недостаточно прав для создания пользователя данной роли'
            );
        const newUser = await this.userService.createUser(createUserInput);
        const emailParams: EmailNotificationParams = {
            userEmail: createUserInput.email,
            subject: 'Now you are in our system',
            message: `Your nickname: ${createUserInput.nickname}, password: ${createUserInput.password}`,
        };
        this.emailNotificationService.sendEmailNotification(emailParams);
        return newUser;
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Mutation(() => User, { name: 'deleteUser' })
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async deleteUser(@Args('userId') userId: string, @Context() context): Promise<User> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const user: JwtValidatedOutput = context.req.user;
        if (user.userId === userId)
            throw new BadRequestException('Вы не можете удалить самого себя');
        const deletedUser = await this.userService.deleteUser(userId);
        const emailParams: EmailNotificationParams = {
            userEmail: deletedUser.email,
            subject: 'Your access was updated',
            message: `Your account was deleted`,
        };
        this.emailNotificationService.sendEmailNotification(emailParams);
        return deletedUser;
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Mutation(() => User, { name: 'blockUser', nullable: true })
    async blockUser(
        @Args('blockUserInput') blockUserInput: BlockUserInput,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        @Context() context
    ): Promise<User> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const user: JwtValidatedOutput = context.req.user;
        if (user.userId === blockUserInput._id)
            throw new BadRequestException('Вы не можете заблокировать самого себя');
        const blockedUser = await this.userService.blockUser(blockUserInput);
        const emailParams: EmailNotificationParams = {
            userEmail: blockedUser.email,
            subject: 'Your access was updated',
            message: `Your account was ${blockedUser.isBlocked ? 'blocked' : 'unblock'}`,
        };
        this.emailNotificationService.sendEmailNotification(emailParams);
        return blockedUser;
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Mutation(() => User, { name: 'updateUser' })
    async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
        return this.userService.updateUser(updateUserInput);
    }
}
