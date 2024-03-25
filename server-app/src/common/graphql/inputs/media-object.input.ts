import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MediaObjectInput {
    @Field(() => String)
    name: string;
    @Field(() => String)
    url: string;
}
