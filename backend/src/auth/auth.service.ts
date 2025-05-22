import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';
import { hash, verify } from 'argon2';
import { type Response, type Request } from 'express';
import { JwtPayload } from './types/jwt-payload.type';
import { JwtService } from '@nestjs/jwt';

export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async register(res: Response, dto: RegisterDto) {
        const { email, password, firstName, lastName } = dto;

        const user = await this.userService.findByEmail(email);
        if (user) {
            throw new ConflictException('Пользователь уже зарегистрирован');
        }

        return await this.prismaService.user.create({
            data: {
                email,
                password: await hash(password),
                firstName,
                lastName,
            },
        });
    }

    async login(res: Response, dto: LoginDto) {
        const { email, password } = dto;

        const user = await this.userService.findByEmail(email);

        const isValidPassword = await verify(user.password, password);

        if (!isValidPassword) {
            throw new NotFoundException('Пользователь не найден');
        }

        return this.auth(res, user.id);
    }

    async refresh(req: Request, res: Response) {
        return 1;
    }

    async logout(res: Response) {
        this.setCookie(res, REFRESH_TOKEN_COOKIE_NAME, new Date(0));

        return true;
    }

    private auth(res: Response, id: string) {
        const { accessToken, refreshToken } = this.generateTokens(id);

        this.setCookie(res, refreshToken, new Date(Date.now() + 60 * 60 * 24 * 7));

        return { accessToken };
    }

    private setCookie(res: Response, token: string, expires: Date) {
        res.cookie(REFRESH_TOKEN_COOKIE_NAME, token, {
            expires,
            httpOnly: true,
            domain: 'localhost',
            secure: false,
            sameSite: 'none',
        });
    }

    private generateTokens(id: string) {
        const payload: JwtPayload = { id };

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: '1h',
        });

        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '7d',
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}
