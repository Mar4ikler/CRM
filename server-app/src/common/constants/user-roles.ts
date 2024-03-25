const ADMIN = 'ADMIN' as const;
const USER = 'USER' as const;

export type Role = 'ADMIN' | 'USER';

export const userRoles = {
    USER,
    ADMIN,
};
