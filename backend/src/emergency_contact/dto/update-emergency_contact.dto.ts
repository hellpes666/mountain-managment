import { PartialType } from '@nestjs/swagger';
import { CreateEmergencyContactDto } from './create-emergency_contact.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateEmergencyContactDto extends PartialType(OmitType(CreateEmergencyContactDto, ['climberId'])) {}
