import { gql } from '@apollo/client';

const GET_CHATS = gql(`
query GetChats ($getChatsInput: GetChatsInput!) {
    getChats(getChatsInput: $getChatsInput) {
        _id
        participants {
            _id
            avatar
            email
            isBlocked
            isDeleted
            nickname
            passwordHash
            role
        }
        messages {
            date
            text
            author {
                _id
                avatar
                email
                isBlocked
                isDeleted
                nickname
                passwordHash
                role
            }
        }
    }
}`);

export const chatQueries = {
    GET_CHATS,
};
