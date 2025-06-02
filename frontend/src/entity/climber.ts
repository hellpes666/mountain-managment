import type { EmergencyContact } from './emergencyContact';
import type { Group } from './group';
import type { User } from './user';

export interface Climber {
	id: string;
	fullName: string;
	address: string;
	createdAt: Date;
	updatedAt: Date;
	phoneNumber: string;
	userId: string;
	user: User;
	emergencyContacts: EmergencyContact[];
	groups: Group[];
}
