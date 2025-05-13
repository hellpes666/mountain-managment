import { CreateGroupDto } from './create-group.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateGroupDto extends PartialType(OmitType(CreateGroupDto, ['mountainId'])) {}
