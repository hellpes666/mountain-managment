import type { Climber, Group, Mountain } from '@/entity';

export type Area = 'climbers' | 'mountains' | 'groups';
export type AreaDeclination = 'Альпинист' | 'Гора' | 'Группа';

export const AREA_MAPPING: Record<Area, AreaDeclination> = {
	climbers: 'Альпинист',
	mountains: 'Гора',
	groups: 'Группа',
};

export type AreaEntityMap = {
	climbers: Climber;
	mountains: Mountain;
	groups: Group;
};
