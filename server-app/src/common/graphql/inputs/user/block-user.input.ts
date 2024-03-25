import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BlockUserInput {
    @Field(() => String)
    _id: string;
    @Field(() => Boolean)
    isBlocked: boolean;
}
