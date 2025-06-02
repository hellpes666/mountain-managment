import type { Climber } from "./climber";

export interface EmergencyContact {
	id: string;
	fullName: string;
	relationship?: Relationship;
	phoneNumber: string;
	email?: string;
	address: string;
	climberId: string;
	createdAt: Date;
	updatedAt: Date;
	climber: Climber;
}

export enum Relationship {
	WIFE = 'WIFE',
	HUSBAND = 'HUSBAND',
	BROTHER = 'BROTHER',
	SISTER = 'SISTER',
	MOTHER = 'MOTHER',
	FATHER = 'FATHER',
	GRANDMOTHER = 'GRANDMOTHER',
	GRANDFATHER = 'GRANDFATHER',
	FRIEND = 'FRIEND',
}