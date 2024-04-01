import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
    @Field(() => String)
    taskId: string;

    @Field(() => String)
    text: string;

    @Field(() => Date)
    date: Date;
}
