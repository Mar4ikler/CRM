import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/data/models/user.model';

@ObjectType()
export class LoginResponse {
    @Field(() => String)
    accessToken: string;
    @Field(() => User)
    user: User;
}
