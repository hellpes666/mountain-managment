import { IsString } from 'class-validator';

export class CreateEmergencyContactDto {
	@IsString()
	first_name: string;

	@IsString()
	last_name: string;

	@IsString()
	phone: string;

	@IsString()
	relation: string;
}
