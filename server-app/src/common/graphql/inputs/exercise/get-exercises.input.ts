import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetExerciseInput {
    @Field(() => String)
    filterString: string;
    @Field(() => Number)
    skip: number;
    @Field(() => Number)
    limit: number;
}
