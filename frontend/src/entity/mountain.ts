import type { Group } from './group';

export interface Mountain {
	id: string;
	name: string;
	height: number;
	country: string;
	region?: string;
	createdAt: Date;
	updatedAt: Date;
	groups: Group[];
}

export type MountainFormData = Omit<Mountain, 'id' | 'createdAt' | 'updatedAt' | 'groups'>;
