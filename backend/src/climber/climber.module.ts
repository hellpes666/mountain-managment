import { GroupModule } from './../group/group.module';
import { Module } from '@nestjs/common';
import { ClimberService } from './climber.service';
import { ClimberController } from './climber.controller';

@Module({
    imports: [GroupModule],
    controllers: [ClimberController],
	providers: [ClimberService],
	exports: [ClimberService]
})
export class ClimberModule {}
