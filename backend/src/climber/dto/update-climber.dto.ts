import { PartialType } from '@nestjs/swagger';
import { CreateClimberDto } from './create-climber.dto';

export class UpdateClimberDto extends PartialType(CreateClimberDto) {}
