import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization'];
        if (token) {
            const decoded = this.decodeToken(token);
            req.user = decoded;
        }
        next();
    }

    private decodeToken(token: string): any {
        return { roles: ['user'] };
    }
}
