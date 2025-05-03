import { Module } from '@nestjs/common';
import { EmergencyContactsService } from './emergency-contacts.service';
import { EmergencyContactsController } from './emergency-contacts.controller';
import { emergencyContactsProviders } from './emergency-contacts.provider';

@Module({
	controllers: [EmergencyContactsController],
	providers: [EmergencyContactsService, ...emergencyContactsProviders],
})
export class EmergencyContactsModule {}
