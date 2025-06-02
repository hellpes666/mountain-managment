import type { Climber, EmergencyContact, Group, Mountain, User } from '@/entity';
import { type ColumnDef } from '@tanstack/react-table';

const generateColumns = <T,>(keys: (keyof T)[]): ColumnDef<T>[] => {
	return keys.map((key) => ({
		accessorKey: key,
		header: String(key).charAt(0).toUpperCase() + String(key).slice(1),
	}));
};

const climberKeys: (keyof Climber)[] = ['id', 'fullName', 'address', 'phoneNumber', 'createdAt'];
export const climberColumns = generateColumns<Climber>(climberKeys);

const emergencyContactKeys: (keyof EmergencyContact)[] = [
	'fullName',
	'phoneNumber',
	'relationship',
	'address',
	'createdAt',
];
export const emergencyContactColumns = generateColumns<EmergencyContact>(emergencyContactKeys);

const groupKeys: (keyof Group)[] = ['id', 'name', 'startDate', 'endDate', 'createdAt'];
export const groupColumns = generateColumns<Group>(groupKeys);

const mountainKeys: (keyof Mountain)[] = ['id', 'name', 'country', 'region', 'height', 'createdAt'];
export const mountainColumns = generateColumns<Mountain>(mountainKeys);

const userKeys: (keyof User)[] = ['id', 'firstName', 'lastName', 'email', 'role', 'createdAt'];
export const userColumns = generateColumns<User>(userKeys);
