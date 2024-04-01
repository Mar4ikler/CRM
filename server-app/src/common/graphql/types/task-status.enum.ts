import { registerEnumType } from '@nestjs/graphql';

export enum TaskStatus {
    NEW = 'NEW',
    ASSIGNED = 'ASSIGNED',
    DISCUSSION = 'DISCUSSION',
    TESTING = 'TESTING',
    COMPLETED = 'COMPLETED',
    CLOSED = 'CLOSED',
}

registerEnumType(TaskStatus, {
    name: 'TaskStatus',
    description: 'Task status',
});
