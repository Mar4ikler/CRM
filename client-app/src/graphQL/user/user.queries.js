import { gql } from '@apollo/client';

const GET_USERS = gql(`
    query GetUsers ($getUsersInput: GetUsersInput!) {
        getUsers(getUsersInput: $getUsersInput) {
            count
            users {
                _id
                avatar
                email
                isBlocked
                isDeleted
                nickname
                role
            }
        }
    }`);

export const userQueries = {
    GET_USERS,
};
