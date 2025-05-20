import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles, ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '@prisma/__generated__';

export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

        const request = context.switchToHttp().getRequest();

        if (!roles) {
            return true;
        }

        if (!roles.includes(request.user.role)) {
            throw new ForbiddenException('Недостаточно прав. У вас нет прав доступа к этому ресурсу.');
        }

        return true;
    }
}
