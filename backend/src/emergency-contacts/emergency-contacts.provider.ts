import { EmergencyContact } from './entities/emergency-contact.entity';

export const emergencyContactsProviders = [
	{
		provide: 'EMERGENCY_CONTACTS_REPOSITORY',
		useValue: EmergencyContact,
	},
];
