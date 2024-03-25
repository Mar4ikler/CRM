import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/data/models/user.model';

@ObjectType()
export class GetUsersResponse {
    @Field(() => [User])
    users: User[];
    @Field(() => Number)
    count: number;
}
