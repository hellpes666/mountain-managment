import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Climber } from './entity/climber.entity';
import { CreateClimberDto } from './dto/create-climber.dto';

@Injectable()
export class ClimberService {
	constructor(
		@Inject('CLIMBER_REPOSITORY') private climberRepository: typeof Climber,
	) {}

	async findAll() {
		const climbers = await this.climberRepository.findAll({
			include: { all: true },
		});

		return climbers;
	}

	async create(dto: CreateClimberDto) {
		const climber = await this.findOneByPhone(dto.phone);

		if (climber) {
			throw new HttpException(
				'Альпинист с таким номером уже существует',
				HttpStatus.BAD_REQUEST,
			);
		}

		return climber;

		//TODO add it later + create checker of the emergency contacts
		const newClimber = await this.climberRepository.create(
			{
				first_name: dto.first_name,
				last_name: dto.last_name,
				phone: dto.phone,
				address: dto.address,
				experienceInMonths: dto.experienceInMonths,
				totalSuccessfulAscents: dto.totalSuccessfulAscents,
				emergencyContacts: dto.emergencyContacts,
			},
			{
				include: [{ association: 'emergencyContacts' }],
			},
		);

		return newClimber;
	}

	async findOneByPhone(phone: string) {
		const climber = await this.climberRepository.findOne({
			where: { phone },
			include: { all: true },
		});

		return climber;
	}
}
