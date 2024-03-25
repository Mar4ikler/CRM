import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { userRoles } from 'src/common/constants/user-roles';
import { Roles } from 'src/common/decorators/roles.decorator';
import { GetUsersInput } from 'src/common/graphql/inputs/user/get-users.input';
import { GetUsersResponse } from 'src/common/graphql/types/get-users.type';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtValidatedOutput } from 'src/common/interfaces/jwt';
import { User } from 'src/data/models/user.model';
import { UserService } from './user.service';
import { RegisterUserInput } from 'src/common/graphql/inputs/user/register-user.input';
import { CreateUserInput } from 'src/common/graphql/inputs/user/create-user.input';
import { BlockUserInput } from 'src/common/graphql/inputs/user/block-user.input';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Roles(userRoles.ADMIN, userRoles.USER)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Query(() => GetUsersResponse, { name: 'getUsers' })
    async getUsers(@Args('getUsersInput') getUsersInput: GetUsersInput): Promise<GetUsersResponse> {
        return this.userService.getUsers(getUsersInput);
    }

    @Roles(userRoles.ADMIN, userRoles.USER)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Query(() => User, { name: 'getUser' })
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getUser(@Context() context): Promise<User> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const user: JwtValidatedOutput = context.req.user;
        return this.userService.getUser(user.userId);
    }

    @Mutation(() => User, { name: 'register' })
    async register(@Args('registerUserInput') registerUserInput: RegisterUserInput): Promise<User> {
        const createUserInput: CreateUserInput = {
            ...registerUserInput,
            isAdmin: false,
        };
        return this.userService.createUser(createUserInput);
    }

    @Roles(userRoles.ADMIN)
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

    @Roles(userRoles.ADMIN)
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
