import { gql } from '@apollo/client';

const MESSAGE_SUBSCRIPTION = gql(`
subscription NewMessage {
    newMessage {
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
}`);

export const chatSubscriptions = {
    MESSAGE_SUBSCRIPTION,
};
