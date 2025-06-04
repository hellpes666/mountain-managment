import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClimberDto } from './dto/create-climber.dto';
import { UpdateClimberDto } from './dto/update-climber.dto';
import { GroupService } from '@/group/group.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Climber } from '@prisma/__generated__';

@Injectable()
export class ClimberService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly groupService: GroupService,
    ) {}

    async create(createClimberDto: CreateClimberDto): Promise<Climber> {
        const { groupIds, fullName, address, phoneNumber, userId } = createClimberDto;

        if (groupIds && groupIds.length > 0) {
            for (const groupId of groupIds) {
                await this.groupService.findOne(groupId);
            }
        }

        const climber = await this.prismaService.climber
            .create({
                data: {
                    userId,
                    fullName,
                    address,
                    phoneNumber,
                    groups: {
                        connect: groupIds ? groupIds.map((id) => ({ id })) : [],
                    },
                },
            })
            .catch((error) => {
                // Проверяем, является ли ошибка конфликтом уникальности
                if (error.code === 'P2002') {
                    throw new ConflictException(`Альпинист с номером "${phoneNumber}" уже существует.`);
                }
                // Если ошибка не о конфликте уникальности, пробрасываем её дальше
                throw error;
            });

        return climber;
    }

    async findAll(): Promise<Climber[]> {
        const climbers = await this.prismaService.climber.findMany({
            include: {
                emergencyContacts: true,
            },
        });

        if (!climbers || !climbers.length) {
            throw new NotFoundException('Альпинисты не были найдены');
        }

        return climbers;
    }

    async findOne(id: string) {
        const climber = await this.prismaService.climber.findUnique({
            where: {
                id,
            },
            include: {
                emergencyContacts: true,
            },
        });

        if (!climber) {
            throw new NotFoundException('Альпинист не был найден');
        }

        return climber;
    }

    async update(id: string, updateClimberDto: UpdateClimberDto): Promise<Climber> {
        await this.findOne(id);

        const { fullName, address, phoneNumber, groupIds } = updateClimberDto;

        if (phoneNumber) {
            const existingClimber = await this.prismaService.climber.findFirst({
                where: {
                    phoneNumber,
                    NOT: { id },
                },
            });
            if (existingClimber) {
                throw new ConflictException(`Альпинист с номером "${phoneNumber}" уже существует.`);
            }
        }

        const updatedClimber = await this.prismaService.climber.update({
            where: {
                id,
            },
            data: {
                fullName,
                address,
                phoneNumber,
                groups: {
                    connect: groupIds?.map((id) => ({ id })),
                },
            },
        });

        return updatedClimber;
    }

    async remove(id: string): Promise<string> {
        const climber = await this.findOne(id);

        await this.prismaService.climber.delete({
            where: {
                id,
            },
        });

        return climber.fullName;
    }
}
