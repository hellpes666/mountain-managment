import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Role, User } from '@prisma/__generated__';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async findOrCreateByClerk(clerkId: string, email: string): Promise<User> {
        return this.prisma.user.upsert({
            where: { clerkId },
            update: {},
            create: {
                clerkId,
                email,
                role: Role.USER,
            },
        });
    }

    async findByClerkId(clerkId: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { clerkId } });
    }

    async updateRole(userId: string, role: Role): Promise<User> {
        return this.prisma.user.update({
            where: { id: userId },
            data: { role },
        });
    }

    async getAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }
}
