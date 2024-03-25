export interface CreateUserFields {
    email: string;
    nickname: string;
    avatar: string;
    passwordHash: string;
    isDeleted: boolean;
    isBlocked: boolean;
    role: string;
}
