import type { Group } from '@/entity';

export type CreateGroup = Pick<Group, 'name' | 'startDate' | 'endDate' | 'mountainId' | 'climbers'>;
