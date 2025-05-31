import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, ConflictException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { UserService } from '@/user/user.service';
import { Role } from '@prisma/__generated__';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    public async register(dto: RegisterDto) {
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
        };

        const accessToken = this.jwtService.sign(payload);

        await this.prismaService.user.create({
            data: {
                ...newUserData,
            },
        });

        return {
            accessToken,
            user: payload,
        };
    }
    public async login(dto: LoginDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!user) {
            throw new ConflictException('Некорректные данные.  Пожалуйста, попробуйте снова.');
        }

        const isPasswordsCompare = await verify(user.password, dto.password);
        if (!isPasswordsCompare) {
            throw new ConflictException('Некорректные данные. Пожалуйста, попробуйте снова.');
        }

        const payload = { email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role };

        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
            user: payload,
        };
    }
}
