import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MountainService } from './mountain.service';
import { CreateMountainDto } from './dto/create-mountain.dto';
import { UpdateMountainDto } from './dto/update-mountain.dto';

@ApiTags('Горы')
@Controller('mountains')
export class MountainController {
    constructor(private readonly mountainService: MountainService) {}

    @Post()
    @ApiOperation({ summary: 'Добавить новую гору' })
    @ApiBody({
        type: CreateMountainDto,
        examples: {
            example1: {
                summary: 'Пример создания новой горы',
                value: {
                    name: 'Эверест',
                    height: 8848,
                    country: 'Непал',
                    region: 'Гималаи',
                },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'Гора успешно добавлена.' })
    @ApiResponse({ status: 400, description: 'Некорректные данные.' })
    create(@Body() createMountainDto: CreateMountainDto) {
        return this.mountainService.create(createMountainDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить список всех гор' })
    @ApiResponse({ status: 200, description: 'Список гор успешно получен.' })
    findAll() {
        return this.mountainService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить информацию о горе по ID' })
    @ApiParam({ name: 'id', required: true, description: 'ID горы' })
    @ApiResponse({ status: 200, description: 'Информация о горе успешно получена.' })
    @ApiResponse({ status: 404, description: 'Гора не найдена.' })
    findOne(@Param('id') id: string) {
        return this.mountainService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить данные о горе' })
    @ApiParam({ name: 'id', required: true, description: 'ID горы' })
    @ApiBody({
        type: UpdateMountainDto,
        examples: {
            example1: {
                summary: 'Пример обновления данных о горе',
                value: {
                    height: 8850,
                    region: 'Гималаи',
                },
            },
        },
    })
    @ApiResponse({ status: 200, description: 'Данные о горе успешно обновлены.' })
    @ApiResponse({ status: 404, description: 'Гора не найдена.' })
    @ApiResponse({ status: 400, description: 'Некорректные данные.' })
    update(@Param('id') id: string, @Body() updateMountainDto: UpdateMountainDto) {
        return this.mountainService.update(id, updateMountainDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить гору по ID' })
    @ApiParam({ name: 'id', required: true, description: 'ID горы' })
    @ApiResponse({ status: 200, description: 'Гора успешно удалена.' })
    @ApiResponse({ status: 404, description: 'Гора не найдена.' })
    remove(@Param('id') id: string) {
        return this.mountainService.remove(id);
    }
}
