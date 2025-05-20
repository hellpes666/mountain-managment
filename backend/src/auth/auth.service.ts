import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Role, User } from '@prisma/__generated__';
import { hash } from 'argon2';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {}

    async register(dto: RegisterDto) {
        const { email, firstName, lastName, password } = dto;

        const user = await this.findByIdOrEmail({ email });

        if (user) {
            throw new ConflictException(
                'Регистрация не удалась. Пользователь с таким email уже существует. Пожалуйста, используйте другой email или войдите в систему.',
            );
        }

        const newUser = await this.prismaService.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: await hash(password),
                role: Role.USER,
            },
        });

        return newUser;
    }

    async findByIdOrEmail(item: { email: string } | { id: string }): Promise<User> {
        const userProfile = await this.prismaService.user.findUnique({
            where: { ...item },
            include: {
                climber: true,
            },
        });

        if (!userProfile) {
            throw new NotFoundException('Профиль пользователя не найден.');
        }

        return userProfile;
    }
}
