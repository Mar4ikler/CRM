import { gql } from '@apollo/client';

const LOGIN = gql(`
    mutation Login ($loginUserInput: LoginUserInput!) {
        login(loginUserInput: $loginUserInput) {
            accessToken
        }
    }`);

const BLOCK_USER = gql(`
    mutation BlockUser ($blockUserInput: BlockUserInput!) {
        blockUser(blockUserInput: $blockUserInput) {
            _id
            avatar
            email
            isBlocked
            isDeleted
            nickname
            role
        }
    }`);

const DELETE_USER = gql(`
    mutation DeleteUser ($userId: String!) {
        deleteUser(userId: $userId) {
            _id
            avatar
            email
            isBlocked
            isDeleted
            nickname
            role
        }
    }`);

const ADD_USER = gql(`
    mutation CreateUser ($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
            _id
            avatar
            email
            isBlocked
            isDeleted
            nickname
            role
        }
    }`);

const UPDATE_USER = gql(`
    mutation UpdateUser ($updateUserInput: UpdateUserInput!) {
        updateUser(updateUserInput: $updateUserInput) {
            _id
            avatar
            email
            isBlocked
            isDeleted
            nickname
            role
        }
    }`);

export const userMutations = {
    LOGIN,
    BLOCK_USER,
    DELETE_USER,
    ADD_USER,
    UPDATE_USER
};
