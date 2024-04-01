import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from 'src/data/models/task.model';

@ObjectType()
export class GetTasksResponse {
    @Field(() => [Task])
    tasks: Task[];
    @Field(() => Number)
    count: number;
}
