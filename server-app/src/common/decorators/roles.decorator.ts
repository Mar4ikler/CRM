import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Role } from '../constants/user-roles';

export const Roles = (...args: Role[]): CustomDecorator => SetMetadata('roles', args);
