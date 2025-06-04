import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { FindByDateDto } from './dto/find-by-date.dto';

@ApiTags('Groups')
@Controller('groups')
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Post()
    @ApiOperation({ summary: 'Создать новую группу' })
    @ApiBody({ type: CreateGroupDto })
    @ApiResponse({ status: 201, description: 'Группа успешно создана', type: Object })
    @ApiResponse({ status: 409, description: 'Группа с таким названием уже существует' })
    create(@Body() createGroupDto: CreateGroupDto) {
        return this.groupService.create(createGroupDto);
    }

    @Get()
    @ApiOperation({ summary: 'Получить список всех групп' })
    @ApiResponse({ status: 200, description: 'Список групп', type: Object })
    @ApiResponse({ status: 404, description: 'Группы не были найдены' })
    findAll(@Query() params?: FindByDateDto) {
        return this.groupService.findAll(params);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Получить одну группу по ID' })
    @ApiParam({ name: 'id', description: 'ID группы' })
    @ApiResponse({ status: 200, description: 'Группа найдена', type: Object })
    @ApiResponse({ status: 404, description: 'Группа не была найдена' })
    findOne(@Param('id') id: string) {
        return this.groupService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Обновить данные группы по ID' })
    @ApiParam({ name: 'id', description: 'ID группы' })
    @ApiBody({ type: UpdateGroupDto })
    @ApiResponse({ status: 200, description: 'Группа успешно обновлена', type: Object })
    @ApiResponse({ status: 404, description: 'Группа не была найдена' })
    update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
        return this.groupService.update(id, updateGroupDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Удалить группу по ID' })
    @ApiParam({ name: 'id', description: 'ID группы' })
    @ApiResponse({ status: 200, description: 'Группа успешно удалена (возвращается имя группы)' })
    @ApiResponse({ status: 404, description: 'Группа не была найдена' })
    remove(@Param('id') id: string) {
        return this.groupService.remove(id);
    }
}
