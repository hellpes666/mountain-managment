import { lazy, type JSX } from 'react';
import { RoutesEnum, type RoutesEnumType } from '@/routes/routes';

export const RoutesAndPagesWithSecure: {
	href: RoutesEnumType;
	secure: boolean;
	page: React.LazyExoticComponent<() => JSX.Element>;
}[] = [
	{
		href: RoutesEnum.Climbers,
		secure: false,
		page: lazy(() => import('../table-data/ClimbersPage').then((module) => ({ default: module.ClimbersPage }))),
	},
	{
		href: RoutesEnum.Groups,
		secure: false,
		page: lazy(() => import('../table-data/GroupsPage').then((module) => ({ default: module.GroupsPage }))),
	},
	{
		href: RoutesEnum.Mountains,
		secure: false,
		page: lazy(() => import('../table-data/MountainsPage').then((module) => ({ default: module.MountainsPage }))),
	},

	{
		href: RoutesEnum.Profile,
		secure: false,
		page: lazy(() => import('@/pages/ProfilePage').then((module) => ({ default: module.ProfilePage }))),
	},
	{
		href: RoutesEnum.MainPage,
		secure: false,
		page: lazy(() => import('@/pages/MainPage').then((module) => ({ default: module.MainPage }))),
	},
	{
		href: RoutesEnum.Service,
		secure: true,
		page: lazy(() => import('@/pages/ServicePage').then((module) => ({ default: module.ServicePage }))),
	},
	{
		href: RoutesEnum.Login,
		secure: false,
		page: lazy(() => import('@/pages/LoginPage').then((module) => ({ default: module.LoginPage }))),
	},
	{
		href: RoutesEnum.Register,
		secure: false,
		page: lazy(() => import('@/pages/RegisterPage').then((module) => ({ default: module.RegisterPage }))),
	},
	{
		href: RoutesEnum.ClimbersId,
		secure: true,
		page: lazy(() => import('../char/ClimberPage').then((module) => ({ default: module.ClimberPage }))),
	},
	{
		href: RoutesEnum.MountainsId,
		secure: true,
		page: lazy(() => import('../char/MountainPage').then((module) => ({ default: module.MountainPage }))),
        },
    {
		href: RoutesEnum.GroupsId,
		secure: true,
		page: lazy(() => import('../char/GroupPage').then((module) => ({ default: module.GroupPage }))),
	},
];
