import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { CreateMountainDto } from './dto/create-mountain.dto';
import { UpdateMountainDto } from './dto/update-mountain.dto';

@Injectable()
export class MountainService {
    constructor(private readonly prismaService: PrismaService) {}

    create(createMountainDto: CreateMountainDto) {
        const { name, height, country, region } = createMountainDto;

        const mountain = this.prismaService.mountain
            .create({
                data: {
                    name,
                    height,
                    country,
                    region,
                },
            })
            .catch((error) => {
                // Проверяем, является ли ошибка конфликтом уникальности
                if (error.code === 'P2002') {
                    throw new ConflictException(`Гора с названием "${name}" уже существует.`);
                }
                // Если ошибка не о конфликте уникальности, пробрасываем её дальше
                throw error;
            });

        return mountain;
    }

    async findAll() {
        const mountains = await this.prismaService.mountain.findMany({
            include: {
                groups: {
                    //TODO подумать над тем чтобы возвращать ещё и самих альпинистов а не только группы
                    select: {
                        id: true,
                        name: true,
                        startDate: true,
                        endDate: true,
                    },
                    orderBy: {
                        startDate: 'asc',
                    },
                },
            },
        });

        if (!mountains || !mountains.length) {
            throw new NotFoundException('Гора не была найдена');
        }

        return mountains;
    }

    async findOne(id: string) {
        const mountain = await this.prismaService.mountain.findUnique({
            where: {
                id,
            },

            include: {
                groups: {
                    //TODO подумать над тем чтобы возвращать ещё и самих альпинистов а не только группы
                    select: {
                        id: true,
                        name: true,
                        startDate: true,
                        endDate: true,
                    },
                    orderBy: {
                        startDate: 'asc',
                    },
                },
            },
        });

        if (!mountain) {
            throw new NotFoundException('Гора не была найдена');
        }

        return mountain;
    }

    async update(id: string, updateMountainDto: UpdateMountainDto) {
        const mountain = await this.findOne(id);

        const { name, height, country, region } = updateMountainDto;

        const updatedMountain = await this.prismaService.mountain.update({
            where: {
                id: mountain.id,
            },
            data: {
                name,
                height,
                country,
                region,
            },
        });

        return updatedMountain;
    }

    async remove(id: string) {
        const mountain = await this.findOne(id);

        await this.prismaService.mountain.delete({
            where: {
                id,
            },
        });

        return mountain.name;
    }
}
