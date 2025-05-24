'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { DoorOpen, Settings, User } from 'lucide-react';

const climbers: { title: string; href: string; description: string }[] = [
	{
		title: 'Альпинисты',
		href: '/export-data/climbers',
		description: 'Экспорт всех данных об альпинистах',
	},
	{
		title: 'Группы',
		href: '/export-data/groups',
		description: 'Экспорт всех данных о группах альпинистов',
	},
	{
		title: 'Горы',
		href: '/export-data/mountains',
		description: 'Экспорт всех данных о горах',
	},
	{
		title: 'Экстренные контакты',
		href: '/export-data/emergency-contacts',
		description: 'Экспорт всех данных о экстренных данных альпинстов',
	},
];

export function NavigationHeader() {
	return (
		<div className="flex w-full items-center justify-between rounded border px-4 py-2">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Данные</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
								<li className="row-span-3">
									<NavigationMenuLink asChild>
										<a
											className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md"
											href="/climbers"
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
									href="/mountains"
									title="Горы"
								>
									Просмотр данных о горах
								</ListItem>
								<ListItem
									href="/groups"
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

			<Popover>
				<PopoverTrigger>
					<Avatar>
						<AvatarImage
							src="/example/01.png"
							alt="avatar"
							className="cursor-pointer"
						/>
						<AvatarFallback>?</AvatarFallback>
					</Avatar>
				</PopoverTrigger>
				<PopoverContent
					className="flex w-40 flex-col items-start gap-3"
					align="end"
				>
					<div className="flex cursor-pointer items-center gap-3">
						<User size={16} />
						<h3>Аккаунт</h3>
					</div>
					<div className="mb-2 flex cursor-pointer items-center gap-3">
						<Settings size={16} />
						<h3>Настройки</h3>
					</div>
					<div className="flex cursor-pointer items-center gap-3">
						<DoorOpen size={16} />
						<h3>Выйти</h3>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
							className,
						)}
						{...props}
					>
						<div className="text-sm leading-none font-medium">{title}</div>
						<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	},
);
ListItem.displayName = 'ListItem';
