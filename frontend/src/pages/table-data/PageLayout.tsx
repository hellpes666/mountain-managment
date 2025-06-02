import { Hero } from '@/components/MainPageContent';
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
	BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

export const PageLayout = ({
	children,
	tableTitle,
	currentBreadcrumbPage,
	exportDataItem,
}: {
	children: ReactNode;
	tableTitle: string;
	currentBreadcrumbPage: string;
	exportDataItem: ReactNode;
}) => {
	return (
		<div className="flex w-full flex-col justify-start gap-12">
			<Hero
				title={`Таблица "${tableTitle}"`}
				subtitle={''}
				link={false}
			/>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to="/">Главная</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{currentBreadcrumbPage}</BreadcrumbPage>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-1">
								<BreadcrumbEllipsis className="size-4" />
								<span className="sr-only">Toggle menu</span>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start">
								<DropdownMenuLabel>Экспорт данных</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>{exportDataItem}</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			{children}
		</div>
	);
};
