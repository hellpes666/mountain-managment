import type { ReactNode } from 'react';
import { RoutesEnum, type RoutesEnumType } from '@/routes/routes';
import { MainPage } from '@/pages/MainPage';
import { ServicePage } from '../ServicePage';

export const RoutesAndPagesWithSecure: {
	href: RoutesEnumType;
	secure: boolean;
	page: ReactNode;
}[] = [
	// { href: RoutesEnum.ClimbersExportData, secure: true, page: <ExportPage type="climbers" /> },
	// { href: RoutesEnum.GroupsExportData, secure: true, page: <ExportPage type="groups" /> },
	// { href: RoutesEnum.MountainsExportData, secure: true, page: <ExportPage type="mountains" /> },
	// { href: RoutesEnum.EmergencyContactsExportData, secure: true, page: <ExportPage type="emergency-contacts" /> },

	// { href: RoutesEnum.Climbers, secure: false, page: <ClimbersPage /> },
	// { href: RoutesEnum.ClimbersId, secure: true, page: <ClimbersPage /> },

	// { href: RoutesEnum.Groups, secure: false, page: <GroupsPage /> },
	// { href: RoutesEnum.GroupsId, secure: true, page: <GroupsPage /> },

	// { href: RoutesEnum.Mountains, secure: false, page: <MountainsPage /> },
	// { href: RoutesEnum.MountainsId, secure: true, page: <MountainsPage /> },

	// { href: RoutesEnum.Profile, secure: false, page: <ProfilePage /> },
	// { href: RoutesEnum.ProfileId, secure: true, page: <ProfilePage /> },

	// { href: '/not-found' as RoutesEnumType, secure: false, page: <NotFoundPage /> },

	{ href: RoutesEnum.MainPage, secure: false, page: <MainPage /> },
	{ href: RoutesEnum.Service, secure: true, page: <ServicePage /> },
	// { href: RoutesEnum.Login, secure: false, page: <Login /> },
	// { href: RoutesEnum.Register, secure: false, page: <Register /> },
];
