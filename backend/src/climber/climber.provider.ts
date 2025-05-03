import { Climber } from './entity/climber.entity';

export const climberProviders = [
	{
		provide: 'CLIMBER_REPOSITORY',
		useValue: Climber,
	},
];
