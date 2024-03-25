export interface CreateUserFields {
    email: string;
    name: string;
    surname: string;
    phoneNumber: string;
    avatar: string;
    favorites: string[];
    passwordHash: string;
    isDeleted: boolean;
    isBlocked: boolean;
    role: string;
    registrationDate: number;
}
