import { gql } from '@apollo/client';

const SEND_MESSAGE = gql(`
mutation SendMessage ($sendMessagetInput: SendMessagetInput!) {
    sendMessage(sendMessagetInput: $sendMessagetInput) {
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

export const chatMutations = {
    SEND_MESSAGE
};
