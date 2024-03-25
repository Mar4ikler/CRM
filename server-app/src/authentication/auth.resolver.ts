/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginUserInput } from 'src/common/graphql/inputs/user/login-user.input';
import { LoginResponse } from 'src/common/graphql/types/login-user.type';
import { GqlAuthGuards } from 'src/common/guards/gql-auth.guard';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => LoginResponse, { name: 'login' })
    @UseGuards(GqlAuthGuards)
    async login(
        @Args('loginUserInput') loginUserInput: LoginUserInput,
        @Context() context
    ): Promise<LoginResponse> {
        return this.authService.login(context.user);
    }
}
