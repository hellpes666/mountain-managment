import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { MountainService } from './mountain.service';
import { CreateMountainDto } from './dto/create-mountain.dto';
import { UpdateMountainDto } from './dto/update-mountain.dto';

@ApiTags('Горы')
@Controller('mountains')
export class MountainController {
    constructor(private readonly mountainService: MountainService) {}

    @Post()
    @ApiOperation({ summary: 'Создание новой горы' })
    @ApiBody({
        type: CreateMountainDto,
        examples: {
            validExample: {
                summary: 'Пример данных для создания',
                value: {
                    name: 'Эльбрус',
                    height: 5642,
                    country: 'Россия',
                    region: 'Кавказ',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Гора успешно создана.',
        type: Object,
    })
    @ApiResponse({
        status: 409,
        description: 'Гора с таким названием уже существует.',
    })
    @ApiResponse({ status: 400, description: 'Ошибка валидации данных.' })
    create(@Body() createMountainDto: CreateMountainDto) {
        return this.mountainService.create(createMountainDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить список всех гор с группами и альпинистами' })
    @ApiResponse({
        status: 200,
        description: 'Успешный ответ с массивом гор и связанной информацией.',
        type: Object,
        isArray: true,
    })
    @ApiResponse({ status: 404, description: 'Горы не найдены.' })
    findAll() {
        return this.mountainService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить информацию о горе по её ID' })
    @ApiParam({ name: 'id', required: true, description: 'UUID горы' })
    @ApiResponse({
        status: 200,
        description: 'Информация о горе с группами и альпинистами.',
        type: Object,
    })
    @ApiResponse({ status: 404, description: 'Гора не найдена.' })
    findOne(@Param('id') id: string) {
        return this.mountainService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить информацию о горе' })
    @ApiParam({ name: 'id', required: true, description: 'UUID горы' })
    @ApiBody({
        type: UpdateMountainDto,
        examples: {
            partialUpdate: {
                summary: 'Обновление высоты и региона',
                value: {
                    height: 8850,
                    region: 'Гималаи',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Данные о горе успешно обновлены.',
        type: Object,
    })
    @ApiResponse({ status: 400, description: 'Ошибка валидации данных.' })
    @ApiResponse({ status: 404, description: 'Гора не найдена.' })
    update(@Param('id') id: string, @Body() updateMountainDto: UpdateMountainDto) {
        return this.mountainService.update(id, updateMountainDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить гору по её ID' })
    @ApiParam({ name: 'id', required: true, description: 'UUID горы' })
    @ApiResponse({
        status: 200,
        description: 'Гора успешно удалена. Возвращает название удалённой горы.',
        schema: {
            type: 'string',
            example: 'Эверест',
        },
    })
    @ApiResponse({ status: 404, description: 'Гора не найдена.' })
    remove(@Param('id') id: string) {
        return this.mountainService.remove(id);
    }
}
