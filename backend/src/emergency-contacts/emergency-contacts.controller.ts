import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { EmergencyContactsService } from './emergency-contacts.service';
import { CreateEmergencyContactDto } from './dto/create-emergency-contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency-contact.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Emergency Contact')
@Controller('emergency-contacts')
export class EmergencyContactsController {
	constructor(
		private readonly emergencyContactsService: EmergencyContactsService,
	) {}

	@Post()
	create(@Body() createEmergencyContactDto: CreateEmergencyContactDto) {
		return this.emergencyContactsService.create(createEmergencyContactDto);
	}

	@Get()
	findAll() {
		return this.emergencyContactsService.findAll();
	}

	@Get()
	findOneByPhone(@Body() phone: string) {
		return this.emergencyContactsService.findOneByPhone(phone);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateEmergencyContactDto: UpdateEmergencyContactDto,
	) {
		return this.emergencyContactsService.update(
			+id,
			updateEmergencyContactDto,
		);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.emergencyContactsService.remove(+id);
	}
}
