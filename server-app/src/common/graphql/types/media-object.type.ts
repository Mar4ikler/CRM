import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MediaObject {
    @Field(() => String)
    name: string;
    @Field(() => String)
    url: string;
}
