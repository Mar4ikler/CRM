import { gql } from '@apollo/client';

const CREATE_TASK = gql(`
    mutation CreateTask ($createTaskInput: CreateTaskInput!) {
        createTask(createTaskInput: $createTaskInput) {
            _id
            description
            endDate
            name
            price
            startDate
            status
        }
    }`);

const CREATE_COMMENT = gql(`
    mutation CreateComment ($createCommentInput: CreateCommentInput!) {
        createComment(createCommentInput: $createCommentInput) {
            _id
            comments {
                date
                text
                user {
                    nickname
                    role
                }
            }
        }
    }`);

const DELETE_TASK = gql(`
mutation DeleteTask ($taskId: String!) {
    deleteTask(taskId: $taskId) {
        _id
        description
        endDate
        name
        price
        startDate
        status
    }
}`);

export const taskMutations = {
    CREATE_TASK,
    CREATE_COMMENT,
    DELETE_TASK
};
