import { Controller } from '@nestjs/common';
import { ClimbingGroupService } from './climbing-group.service';

@Controller('climbing-group')
export class ClimbingGroupController {
  constructor(private readonly climbingGroupService: ClimbingGroupService) {}
}
