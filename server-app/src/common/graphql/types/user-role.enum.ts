import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    DEVELOPER = 'DEVELOPER',
    CLIENT = 'CLIENT'
}

registerEnumType(UserRole, {
    name: 'UserRole',
    description: 'User roles',
});
