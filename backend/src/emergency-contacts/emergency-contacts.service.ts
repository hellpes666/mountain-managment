import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateEmergencyContactDto } from './dto/create-emergency-contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency-contact.dto';
import { EmergencyContact } from './entities/emergency-contact.entity';

@Injectable()
export class EmergencyContactsService {
	constructor(
		@Inject('EMERGENCY_CONTACTS_REPOSITORY')
		private emergencyContactsRepository: typeof EmergencyContact,
	) {}

	async create(createEmergencyContactDto: CreateEmergencyContactDto) {
		const emergency_contact = await this.findOneByPhone(
			createEmergencyContactDto.phone,
		);
		if (emergency_contact) {
			throw new HttpException(
				'Экстренный контакт с таким номером уже существует',
				HttpStatus.BAD_REQUEST,
			);
		}

		return emergency_contact;
	}

	findAll() {
		return `This action returns all emergencyContacts`;
	}

	async findOneByPhone(phone: string) {
		const emergencyContact = await this.emergencyContactsRepository.findOne(
			{
				where: { phone },
				include: { all: true },
			},
		);

		return emergencyContact;
	}

	update(id: number, updateEmergencyContactDto: UpdateEmergencyContactDto) {
		return `This action updates a #${id} emergencyContact`;
	}

	remove(id: number) {
		return `This action removes a #${id} emergencyContact`;
	}
}
