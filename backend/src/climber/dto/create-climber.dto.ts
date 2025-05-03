import { CreateEmergencyContactDto } from './../../emergency-contacts/dto/create-emergency-contact.dto';
import { Type } from 'class-transformer';
import {
	IsArray,
	IsNumber,
	IsOptional,
	IsString,
	Length,
	Matches,
	ValidateNested,
} from 'class-validator';

export class CreateClimberDto {
	@IsString()
	@Length(2, 100)
	first_name: string;

	@IsString()
	@Length(2, 100)
	last_name: string;

	@IsString()
	@Matches(/^\+7-(\d{3})-\d{3}-\d{2}-\d{2}$/, {
		message: 'Неверный формат номера телефона. Ожидается: +7-XXX-XXX-XX-XX',
	})
	phone: string;

	@IsString()
	address: string;

	@IsOptional()
	@IsNumber()
	experienceInMonths?: number;

	@IsOptional()
	@IsNumber()
	totalSuccessfulAscents?: number;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateEmergencyContactDto)
	emergencyContacts?: CreateEmergencyContactDto[];
}
