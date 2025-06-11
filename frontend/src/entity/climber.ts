import type { EmergencyContact } from './emergencyContact';

export interface Climber {
	id: string;
	fullName: string;
	address: string;
	createdAt: Date;
	updatedAt: Date;
	phoneNumber: string;
	userId: string;
	emergencyContacts: EmergencyContact[];
}

export type ClimberFormData = Omit<Climber, 'id' | 'createdAt' | 'updatedAt' | 'emergencyContactsIds' | 'user'>;
