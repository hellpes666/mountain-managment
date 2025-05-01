import { Module } from '@nestjs/common';
import { ClimbingGroupService } from './climbing-group.service';
import { ClimbingGroupController } from './climbing-group.controller';

@Module({
  controllers: [ClimbingGroupController],
  providers: [ClimbingGroupService],
})
export class ClimbingGroupModule {}
