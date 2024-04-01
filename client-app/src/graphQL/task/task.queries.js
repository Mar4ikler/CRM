import { gql } from '@apollo/client';

const GET_TASKS = gql(`
    query GetTasks ($getTasksInput: GetTasksInput!) {
        getTasks(getTasksInput: $getTasksInput) {
            count
            tasks {
                _id
                client {
                    _id
                    avatar
                    email
                    isBlocked
                    isDeleted
                    nickname
                    passwordHash
                    role
                }
                description
                developers {
                    _id
                    avatar
                    email
                    isBlocked
                    isDeleted
                    nickname
                    passwordHash
                    role
                }
                endDate
                name
                price
                startDate
                status
                comments {
                    date
                    text
                    user {
                        nickname
                        role
                    }
                }
                creator {
                    nickname
                }
            }
        }
    }`);

const GET_TASK = gql(`
    query GetTask ($taskId: String!) {
        getTask(taskId: $taskId) {
            _id
            description
            endDate
            name
            price
            startDate
            status
            comments {
                date
                text
                user {
                    _id
                    nickname
                    role
                }
            }
            client {
                _id
                nickname
                role
            }
            creator {
                _id
                nickname
                role
            }
            developers {
                _id
                nickname
                role
            }
        }
    }`);


export const taskQueries = {
    GET_TASKS,
    GET_TASK
};