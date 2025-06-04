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
	emergencyContactsIds: string[];
	groupIds: string[];
}

export type ClimberFormData = Omit<Climber, 'id' | 'createdAt' | 'updatedAt' | 'emergencyContactsIds' | 'user'>;
