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
	return (
		<div className="flex w-full items-center justify-between rounded border px-4 py-2">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem className="mr-10 underline">
						<Link to="/">Главная</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Данные</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
								<li className="row-span-3">
									<NavigationMenuLink asChild>
										<a
											className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md"
											href={RoutesEnum.Climbers}
										>
											<div className="mt-4 mb-2 text-lg font-medium">Альпинисты</div>
											<p className="text-muted-foreground text-sm leading-tight">
												Просмотр подробных данных об альпинистах, их группах и экстренных
												котнактов
											</p>
										</a>
									</NavigationMenuLink>
								</li>
								<ListItem
									href={RoutesEnum.Mountains}
									title="Горы"
								>
									Просмотр данных о горах
								</ListItem>
								<ListItem
									href={RoutesEnum.Groups}
									title="Группы"
								>
									Просмотр данных о группах альпинистов
								</ListItem>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Экспорт</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
								{climbers.map((component) => (
									<ListItem
										key={component.title}
										title={component.title}
										href={component.href}
									>
										{component.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem></NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			{/* user */}
			<div className="flex items-center gap-6">
				<Avatar>
					<AvatarFallback>U</AvatarFallback>
				</Avatar>
				<ChangeThemeButton />
			</div>
		</div>
	);
}
