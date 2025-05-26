import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '@/user/user.service';
import { verifyToken } from '../lib/verivy-clerk-token';

@Injectable()
export class ClerkGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('No auth token');
        }

        const token = authHeader.split(' ')[1];

        const payload = await verifyToken(token);
        if (!payload) throw new UnauthorizedException('Invalid token');

        const { sub: clerkId, email } = payload;

        const user = await this.userService.findOrCreateByClerk(clerkId, email);
        req['user'] = user;

        return true;
    }
}
