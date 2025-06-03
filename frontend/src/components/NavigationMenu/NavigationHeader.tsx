import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ChangeThemeButton } from './ChangeThemeButton';
import { ListItem } from './ListItem';
import { RoutesEnum, type RoutesEnumType } from '@/routes/routes';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';
import { Skeleton } from '../Skeletons/Skeleton';

const climbers: { title: string; href: RoutesEnumType; description: string }[] = [
	{
		title: 'Альпинисты',
		href: RoutesEnum.ClimbersExportData,
		description: 'Экспорт всех данных об альпинистах',
	},
	{
		title: 'Группы',
		href: RoutesEnum.GroupsExportData,
		description: 'Экспорт всех данных о группах альпинистов',
	},
	{
		title: 'Горы',
		href: RoutesEnum.MountainsExportData,
		description: 'Экспорт всех данных о горах',
	},
	{
		title: 'Экстренные контакты',
		href: RoutesEnum.EmergencyContactsExportData,
		description: 'Экспорт всех данных о экстренных данных альпинистов',
	},
];

export function NavigationHeader() {
	const { checkAuth, isAuthorized, isLoading } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isLoading) {
		return (
			<div className="flex w-full animate-pulse items-center justify-between rounded border px-4 py-2">
				<div className="flex items-center gap-4">
					<Skeleton className="mr-5 h-6 w-18" />
					<Skeleton className="h-6 w-20" />
					<Skeleton className="h-6 w-20" />
				</div>
				<div className="flex items-center gap-6">
					<Skeleton className="size-8 rounded-full" />
					<Skeleton className="size-9 rounded" />
				</div>
			</div>
		);
	}

	return (
		<div className="flex w-full items-center justify-between rounded border px-4 py-2">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem className="mr-10 underline">
						<Link to="/">Главная</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger disabled={!isAuthorized}>Данные</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
								<li className="row-span-3">
									<NavigationMenuLink asChild>
										<Link
											className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md"
											to={RoutesEnum.Climbers}
										>
											<div className="mt-4 mb-2 text-lg font-medium">Альпинисты</div>
											<p className="text-muted-foreground text-sm leading-tight">
												Просмотр подробных данных об альпинистах, их группах и экстренных
												контактах
											</p>
										</Link>
									</NavigationMenuLink>
								</li>
								<Link to={RoutesEnum.Mountains}>
									<ListItem title="Горы">Просмотр данных о горах</ListItem>
								</Link>
								<Link to={RoutesEnum.Groups}>
									<ListItem title="Группы">Просмотр данных о группах альпинистов</ListItem>
								</Link>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger disabled={!isAuthorized}>Экспорт</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
								{climbers.map((component) => (
									<Link to={component.href}>
										<ListItem
											key={component.title}
											title={component.title}
										>
											{component.description}
										</ListItem>
									</Link>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			{/* user */}
			<div className="flex items-center gap-6">
				{isAuthorized ? (
					<Link to="/profile">
						<Avatar>
							<AvatarFallback>U</AvatarFallback>
						</Avatar>
					</Link>
				) : (
					<Button>
						<Link to="/register">Войти</Link>
					</Button>
				)}
				<ChangeThemeButton />
			</div>
		</div>
	);
}
