import { ClimberModule } from './../climber/climber.module';
import { Module } from '@nestjs/common';
import { EmergencyContactService } from './emergency_contact.service';
import { EmergencyContactController } from './emergency_contact.controller';

@Module({
    imports: [ClimberModule],
    controllers: [EmergencyContactController],
    providers: [EmergencyContactService],
	exports: [EmergencyContactService]
})
export class EmergencyContactModule {}
