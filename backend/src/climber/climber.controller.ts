import { Controller } from '@nestjs/common';
import { ClimberService } from './climber.service';

@Controller('climber')
export class ClimberController {
  constructor(private readonly climberService: ClimberService) {}
}
