import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { UserRole } from '../graphql/types/user-role.enum';

export const Roles = (...args: UserRole[]): CustomDecorator => SetMetadata('roles', args);
