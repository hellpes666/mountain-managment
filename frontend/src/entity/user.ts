import type { Climber } from './climber';

export interface User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: Role;
	createdAt: Date;
	updatedAt: Date;
	climber?: Climber;
}

export enum Role {
	ADMIN = 'ADMIN',
	USER = 'USER',
}

export type UserOption = Pick<User, 'id' | 'firstName' | 'lastName' | 'email'>;
