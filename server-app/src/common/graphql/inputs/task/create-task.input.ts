import { Field, InputType } from '@nestjs/graphql';
import { TaskStatus } from '../../types/task-status.enum';

@InputType()
export class CreateTaskInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;

    @Field(() => Number)
    price: number;

    @Field(() => Date)
    startDate: Date;

    @Field(() => Date)
    endDate: Date;

    @Field(() => [String])
    developers: string[];

    @Field(() => String)
    client: string;

    @Field(() => TaskStatus)
    status: TaskStatus;
}
