import { gql } from "@apollo/client";

const LOGIN = gql(`
    mutation Login ($loginUserInput: LoginUserInput!) {
        login(loginUserInput: $loginUserInput) {
            accessToken
        }
    }`);

export const userMutations = {
    LOGIN
};
