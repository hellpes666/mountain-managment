import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, ConflictException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { UserService } from '@/user/user.service';
import { Role } from '@prisma/__generated__';
import { type Response, type Request } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    public async register(dto: RegisterDto, res: Response) {
        if (await this.userService.getUserByEmail(dto.email)) {
            throw new ConflictException('Некорректные данные.  Пожалуйста, попробуйте снова.');
        }

        const hashedPassword = await hash(dto.password);
        const newUserData = { ...dto, password: hashedPassword };

        const payload = {
            email: newUserData.email,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            role: Role.USER,
            createdAt: new Date(),
        };

        const accessToken = this.jwtService.sign(payload);

        await this.prismaService.user.create({
            data: {
                ...newUserData,
            },
        });

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: '/',
        });

        return {
            accessToken,
            user: payload,
        };
    }
    public async login(dto: LoginDto, res: Response) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!user) {
            throw new ConflictException('Некорректные данные.  Пожалуйста, попробуйте снова.');
        }

        const isPasswordsCompare = await verify(user.password, dto.password);
        if (!isPasswordsCompare) {
            throw new ConflictException('Некорректные данные. Пожалуйста, попробуйте снова.');
        }

        const payload = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            createdAt: user.createdAt,
        };

        const accessToken = this.jwtService.sign(payload);

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: '/',
        });

        return {
            accessToken,
            user: payload,
        };
    }

    public async checkAuth(req: Request) {
        const token = req.cookies?.access_token;
        if (!token) {
            return {};
        }
        try {
            const decoded = this.jwtService.verify(token);
            return decoded;
        } catch {
            return {};
        }
    }
}
