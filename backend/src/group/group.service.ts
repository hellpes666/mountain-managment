import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Group } from '@prisma/client';
import { MountainService } from '../mountain/mountain.service';

@Injectable()
export class GroupService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly mountainService: MountainService,
    ) {}

    create(createGroupDto: CreateGroupDto): Promise<Group> {
        const { name, startDate, endDate, mountainId } = createGroupDto;

        const mountain = this.mountainService.findOne(mountainId);

        const group = this.prismaService.group
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

    async findAll(): Promise<Group[]> {
        const groups = await this.prismaService.group.findMany({
            include: {
                mountain: true,
                climbers: {
                    select: {
                        fullName: true,
                        address: true,
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
        const group = await this.findOne(id);

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
