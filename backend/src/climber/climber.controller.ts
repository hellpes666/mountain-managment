import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClimberService } from './climber.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Climber } from './entity/climber.entity';
import { CreateClimberDto } from './dto/create-climber.dto';

@ApiTags('Climbers')
@Controller('climbers')
export class ClimberController {
	constructor(private readonly climberService: ClimberService) {}

	@ApiOperation({ summary: 'Получение всех альпинистов' })
	@ApiResponse({
		status: 200,
		description: 'Список всех альпинистов.',
		type: Climber,
		isArray: true,
	})
	@Get()
	findAll() {
		return this.climberService.findAll();
	}

	@ApiOperation({ summary: 'Получение пользователя по номеру телефона' })
	@ApiResponse({
		status: 200,
		description: 'Пользователь найденный по номеру телефона.',
		type: Climber,
		isArray: true,
	})
	@Get()
	findOneByPhone(@Body() phone: string) {
		return this.climberService.findOneByPhone(phone);
	}

	@ApiOperation({ summary: 'Создание нового альпиниста' })
	@ApiResponse({ status: 201, description: 'Альпинист успешно создан.' })
	@ApiResponse({
		status: 400,
		description: 'Некорректные данные для создания альпиниста.',
	})
	@Post()
	create(@Body() dto: CreateClimberDto) {
		return this.climberService.create(dto);
	}
}
