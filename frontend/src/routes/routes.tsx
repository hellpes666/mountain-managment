export const RoutesEnum = {
	ClimbersExportData: 'climbers/export-data',
	GroupsExportData: 'groups/export-data',
	MountainsExportData: 'mountains/export-data',
	EmergencyContactsExportData: 'emergency-contacts/export-data',
	Climbers: 'climbers',
	ClimbersId: 'climbers/:id',
	Groups: 'groups',
	GroupsId: 'groups/:id',
	Mountains: 'mountains',
	MountainsId: 'mountains/:id',
	Profile: 'profile/@me',
	ProfileId: 'profile/:id',
	Service: 'service',
	MainPage: '',
} as const;

export type RoutesEnumType = (typeof RoutesEnum)[keyof typeof RoutesEnum];
