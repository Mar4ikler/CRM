/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    matchRoles(roles: string[], userRole: string): boolean {
        return roles.some((role) => role === userRole);
    }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const { user } = context.getArgByIndex(2).req;
        if (this.matchRoles(roles, user.role)) return true;
        else throw new ForbiddenException('Вам не разрешен доступ к этой странице');
    }
}
