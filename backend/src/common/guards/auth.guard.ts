import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (typeof request.userId === 'undefined') {
            throw new UnauthorizedException(
                'Пользователь не авторизован. Пожалуйста, войдите в систему, чтобы получить доступ',
            );
        }

        return true;
    }
}
