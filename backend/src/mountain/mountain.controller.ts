import { Controller } from '@nestjs/common';
import { MountainService } from './mountain.service';

@Controller('mountain')
export class MountainController {
  constructor(private readonly mountainService: MountainService) {}
}
