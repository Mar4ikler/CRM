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

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Query(() => GetUsersResponse, { name: 'getUsers' })
    async getUsers(@Args('getUsersInput') getUsersInput: GetUsersInput): Promise<GetUsersResponse> {
        return this.userService.getUsers(getUsersInput);
    }

    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Query(() => User, { name: 'getUser' })
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getUser(@Context() context): Promise<User> {
        const user: JwtValidatedOutput = context.req.user as JwtValidatedOutput;
        return this.userService.getUser(user.userId);
    }

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
        return this.userService.createUser(createUserInput);
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
        return this.userService.deleteUser(userId);
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
        return this.userService.blockUser(blockUserInput);
    }
}
