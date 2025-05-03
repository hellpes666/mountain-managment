import { Module } from '@nestjs/common';
import { ClimberService } from './climber.service';
import { ClimberController } from './climber.controller';
import { climberProviders } from './climber.provider';

@Module({
	controllers: [ClimberController],
	providers: [ClimberService, ...climberProviders],
})
export class ClimberModule {}
