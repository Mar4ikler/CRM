import { registerEnumType } from '@nestjs/graphql';

export enum TaskStatus {
    NEW = 'NEW',
    ASSIGNED = 'ASSIGNED',
    TESTING = 'TESTING',
    COMPLETED = 'COMPLETED',
}

registerEnumType(TaskStatus, {
    name: 'TaskStatus',
    description: 'Task status',
});
