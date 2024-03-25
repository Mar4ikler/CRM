import { UserRole } from '../graphql/types/user-role.enum';

export const roleOptions = {
    [UserRole.ADMIN]: {
        availableRolesForCreation: [UserRole.MANAGER, UserRole.DEVELOPER, UserRole.CLIENT],
    },
    [UserRole.MANAGER]: {
        availableRolesForCreation: [UserRole.DEVELOPER, UserRole.CLIENT],
    },
};
