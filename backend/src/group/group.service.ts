import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { MountainService } from '@/mountain/mountain.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from '@prisma/__generated__';
import { FindByDateDto } from './dto/find-by-date.dto';

@Injectable()
export class GroupService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly mountainService: MountainService,
    ) {}

    async create(createGroupDto: CreateGroupDto): Promise<Group> {
        const { name, startDate, endDate, mountainId } = createGroupDto;

        await this.mountainService.findOne(mountainId);

        const group = await this.prismaService.group
            .create({
                data: {
                    name,
                    startDate,
                    endDate,
                    mountainId,
                },
            })
            .catch((error) => {
                // Проверяем, является ли ошибка конфликтом уникальности
                if (error.code === 'P2002') {
                    throw new ConflictException(`Группа с названием "${name}" уже существует.`);
                }
                // Если ошибка не о конфликте уникальности, пробрасываем её дальше
                throw error;
            });

        return group;
    }

    async findAll(params?: FindByDateDto): Promise<Group[]> {
        const groups = await this.prismaService.group.findMany({
            where: {
                AND: [
                    params?.startDate ? { startDate: { gte: params.startDate } } : {},
                    params?.endDate ? { endDate: { lte: params.endDate } } : {},
                ],
            },
            include: {
                mountain: true,
                climbers: {
                    select: {
                        fullName: true,
                        address: true,
                        phoneNumber: true,
                        emergencyContacts: true,
                    },
                    orderBy: {
                        fullName: 'asc',
                    },
                },
            },
        });

        if (!groups || !groups.length) {
            throw new NotFoundException('Группы не были найдены');
        }

        return groups;
    }

    async findOne(id: string) {
        const group = await this.prismaService.group.findUnique({
            where: {
                id,
            },

            include: {
                mountain: true,
                climbers: {
                    select: {
                        fullName: true,
                        address: true,
                        phoneNumber: true,
                        emergencyContacts: true,
                    },
                    orderBy: {
                        fullName: 'asc',
                    },
                },
            },
        });

        if (!group) {
            throw new NotFoundException('Группа не была найдена');
        }

        return group;
    }

    async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
        await this.findOne(id);

        const { name, startDate, endDate } = updateGroupDto;

        const updatedGroup = await this.prismaService.group.update({
            where: {
                id,
            },
            data: {
                name,
                startDate,
                endDate,
            },
        });

        return updatedGroup;
    }

    async remove(id: string): Promise<string> {
        const group = await this.findOne(id);

        await this.prismaService.group.delete({
            where: {
                id,
            },
        });

        return group.name;
    }
}
