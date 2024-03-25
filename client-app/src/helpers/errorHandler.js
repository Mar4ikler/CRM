import { logout } from './logout';

export const errorHandler = (errorResponse) => {
    if (errorResponse.graphQLErrors) {
        const { message, extensions } = errorResponse.graphQLErrors[0];
        const originalError = extensions.originalError;
        const statusCode = originalError.statusCode;
        if (statusCode === 401) {
            if (localStorage.getItem('loginObject') != null) logout();
            return null;
        }
        if (statusCode === 500) {
            return null;
        }
        return {
            code: extensions.code,
            statusCode: statusCode,
            message: message,
        };
    } else return null;
};
