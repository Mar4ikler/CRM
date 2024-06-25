import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendMessagetInput {
    @Field(() => String)
    receiverId: string;

    @Field(() => String)
    text: string;
}
