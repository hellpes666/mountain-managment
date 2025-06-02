import type { Climber } from './climber';
import type { Mountain } from './mountain';

export interface Group {
	id: string;
	name: string;
	startDate: string;
	endDate?: string;
	mountainId: string;
	createdAt: Date;
	updatedAt: Date;
	mountain: Mountain;
	climbers: Climber[];
}
