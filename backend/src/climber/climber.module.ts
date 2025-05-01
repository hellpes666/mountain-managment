import { Module } from '@nestjs/common';
import { ClimberService } from './climber.service';
import { ClimberController } from './climber.controller';

@Module({
  controllers: [ClimberController],
  providers: [ClimberService],
})
export class ClimberModule {}
