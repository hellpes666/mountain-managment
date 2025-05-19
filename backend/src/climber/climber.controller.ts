import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ClimberService } from './climber.service';
import { CreateClimberDto } from './dto/create-climber.dto';
import { UpdateClimberDto } from './dto/update-climber.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Climber } from '@prisma/client';

@ApiTags('Альпинисты')
@Controller('climbers')
export class ClimberController {
    constructor(private readonly climberService: ClimberService) {}

    @Post()
    @ApiOperation({ summary: 'Создание нового альпиниста' })
    @ApiResponse({ status: 201, description: 'Альпинист успешно создан', type: Object })
    @ApiResponse({ status: 409, description: 'Альпинист с таким номером уже существует' })
    create(@Body() createClimberDto: CreateClimberDto): Promise<Climber> {
        return this.climberService.create(createClimberDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получение списка всех альпинистов' })
    @ApiResponse({ status: 200, description: 'Список альпинистов', type: [Object] })
    @ApiResponse({ status: 404, description: 'Альпинисты не были найдены' })
    findAll(): Promise<Climber[]> {
        return this.climberService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получение информации об альпинисте по ID' })
    @ApiParam({ name: 'id', description: 'UUID альпиниста' })
    @ApiResponse({ status: 200, description: 'Альпинист найден', type: Object })
    @ApiResponse({ status: 404, description: 'Альпинист не найден' })
    findOne(@Param('id') id: string): Promise<Climber> {
        return this.climberService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновление информации об альпинисте' })
    @ApiParam({ name: 'id', description: 'UUID альпиниста' })
    @ApiResponse({ status: 200, description: 'Альпинист обновлён', type: Object })
    @ApiResponse({ status: 409, description: 'Номер телефона уже используется другим альпинистом' })
    @ApiResponse({ status: 404, description: 'Альпинист не найден' })
    update(@Param('id') id: string, @Body() updateClimberDto: UpdateClimberDto): Promise<Climber> {
        return this.climberService.update(id, updateClimberDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удаление альпиниста' })
    @ApiParam({ name: 'id', description: 'UUID альпиниста' })
    @ApiResponse({ status: 200, description: 'Альпинист удалён. Возвращается имя.' })
    @ApiResponse({ status: 404, description: 'Альпинист не найден' })
    remove(@Param('id') id: string): Promise<string> {
        return this.climberService.remove(id);
    }
}
