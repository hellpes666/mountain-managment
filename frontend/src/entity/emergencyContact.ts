export interface EmergencyContact {
	id: string;
	fullName: string;
	relationship: Relationship | null;
	phoneNumber: string;
	email: string | null;
	address: string;
	climberId: string;
	createdAt: Date;
	updatedAt: Date;
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
