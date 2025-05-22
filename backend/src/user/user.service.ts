import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async findByEmail(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            throw new NotFoundException('Пользователь не найден');
        }

        return user;
    }
}
