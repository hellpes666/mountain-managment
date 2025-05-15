import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiNotFoundResponse,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiBadRequestResponse,
    ApiOkResponse,
    ApiParam,
} from '@nestjs/swagger';
import { EmergencyContactService } from './emergency_contact.service';
import { CreateEmergencyContactDto } from './dto/create-emergency_contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency_contact.dto';
import { EmergencyContact } from '@prisma/client';

@ApiTags('Emergency Contacts')
@Controller('emergency-contacts')
export class EmergencyContactController {
    constructor(private readonly emergencyContactService: EmergencyContactService) {}

    @Post()
    @ApiOperation({ summary: 'Создание экстренного контакта' })
    @ApiCreatedResponse({
        description: 'Контакт успешно создан',
        type: CreateEmergencyContactDto,
    })
    @ApiConflictResponse({ description: 'Контакт с таким номером уже существует' })
    @ApiBadRequestResponse({ description: 'Некорректные данные запроса' })
    create(@Body() createEmergencyContactDto: CreateEmergencyContactDto) {
        return this.emergencyContactService.create(createEmergencyContactDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить все экстренные контакты' })
    @ApiOkResponse({
        description: 'Список экстренных контактов получен',
        type: [CreateEmergencyContactDto],
    })
    @ApiNotFoundResponse({ description: 'Контакты не найдены' })
    findAll() {
        return this.emergencyContactService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить один экстренный контакт по ID' })
    @ApiParam({ name: 'id', description: 'UUID контакта' })
    @ApiOkResponse({ description: 'Контакт найден', type: CreateEmergencyContactDto })
    @ApiNotFoundResponse({ description: 'Контакт не найден' })
    findOne(@Param('id') id: string) {
        return this.emergencyContactService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить экстренный контакт' })
    @ApiParam({ name: 'id', description: 'UUID контакта' })
    @ApiOkResponse({ description: 'Контакт обновлён', type: CreateEmergencyContactDto })
    @ApiConflictResponse({ description: 'Контакт с такими данными уже существует' })
    @ApiNotFoundResponse({ description: 'Контакт не найден' })
    @ApiBadRequestResponse({ description: 'Некорректные данные запроса' })
    update(@Param('id') id: string, @Body() updateEmergencyContactDto: UpdateEmergencyContactDto) {
        return this.emergencyContactService.update(id, updateEmergencyContactDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить экстренный контакт' })
    @ApiParam({ name: 'id', description: 'UUID контакта' })
    @ApiOkResponse({ description: 'Контакт удалён. Возвращает номер телефона' })
    @ApiNotFoundResponse({ description: 'Контакт не найден' })
    @HttpCode(HttpStatus.OK)
    remove(@Param('id') id: string) {
        return this.emergencyContactService.remove(id);
    }
}
