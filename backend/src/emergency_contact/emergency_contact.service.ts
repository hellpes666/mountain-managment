import { ClimberService } from './../climber/climber.service';
import { PrismaService } from './../prisma/prisma.service';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmergencyContactDto } from './dto/create-emergency_contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency_contact.dto';
import { EmergencyContact } from '@prisma/client';

@Injectable()
export class EmergencyContactService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly climberService: ClimberService,
    ) {}

    async create(createEmergencyContactDto: CreateEmergencyContactDto): Promise<EmergencyContact> {
        const { fullName, relationship, phoneNumber, email, address, climberId } = createEmergencyContactDto;

        this.climberService.findOne(climberId);

        const emergencyContact = await this.prismaService.emergencyContact
            .create({
                data: {
                    fullName,
                    relationship,
                    phoneNumber,
                    email,
                    address,
                    climberId,
                },
            })
            .catch((error) => {
                // Проверяем, является ли ошибка конфликтом уникальности
                if (error.code === 'P2002') {
                    throw new ConflictException(
                        `Контакт для экстренного вызова с номером "${phoneNumber}" уже существует.`,
                    );
                }
                // Если ошибка не о конфликте уникальности, пробрасываем её дальше
                throw error;
            });

        return emergencyContact;
    }

    async findAll(): Promise<EmergencyContact[]> {
        const emergencyContacts = await this.prismaService.emergencyContact.findMany({
            include: {
                climber: true,
            },
        });

        if (!emergencyContacts || !emergencyContacts.length) {
            throw new NotFoundException('Контакты экстренного вызова не были найдены');
        }

        return emergencyContacts;
    }

    async findOne(id: string): Promise<EmergencyContact> {
        const emergencyContact = await this.prismaService.emergencyContact.findUnique({
            where: { id },
            include: {
                climber: true,
            },
        });

        if (!emergencyContact) {
            throw new NotFoundException('Контакт экстренного вызова не был найден');
        }

        return emergencyContact;
    }

    async update(id: string, updateEmergencyContactDto: UpdateEmergencyContactDto): Promise<EmergencyContact> {
        await this.findOne(id);

        const { fullName, relationship, phoneNumber, email, address } = updateEmergencyContactDto;

        if (phoneNumber || email) {
            const existingClimber = await this.prismaService.emergencyContact.findFirst({
                where: {
                    phoneNumber,
                    email,
                    NOT: { id },
                },
            });
            if (existingClimber) {
                throw new ConflictException('Экстренный контакт с такими данными уже существует.');
            }
        }

        const updatedEmergencyContact = await this.prismaService.emergencyContact.update({
            where: {
                id,
            },
            data: {
                fullName,
                relationship,
                phoneNumber,
                email,
                address,
            },
        });

        return updatedEmergencyContact;
    }

    async remove(id: string): Promise<string> {
        const numberToDelete = await this.findOne(id);

        await this.prismaService.emergencyContact.delete({
            where: {
                id,
            },
        });

        return numberToDelete.phoneNumber;
    }
}
