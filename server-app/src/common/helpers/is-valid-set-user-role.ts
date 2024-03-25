import { roleOptions } from '../constants/role-options';

export const isValidSetUserRole = (clientRole: string, setUserRole: string): boolean => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return roleOptions[clientRole].availableRolesForCreation.find((role) => role === setUserRole);
};
