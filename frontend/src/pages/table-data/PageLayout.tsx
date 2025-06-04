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
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
	DialogHeader,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Area } from '@/types/content-area';
import { Plus } from 'lucide-react';
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

export const PageLayout = ({
	children,
	tableTitle,
	currentBreadcrumbPage,
	exportDataItem,
	dialogTitle,
	form,
}: {
	children: ReactNode;
	tableTitle: string;
	currentBreadcrumbPage: string;
	exportDataItem: ReactNode;
	dialogTitle: string;
	area: Area;
	form: ReactNode;
}) => {
	async function submitForm(formData: FormData) {
		const data = {
			email: formData.get('email') as string,
		};
	}
	return (
		<div className="flex w-full flex-col justify-start gap-12">
			<Hero
				title={`Таблица "${tableTitle}"`}
				subtitle={''}
				link={false}
			/>
			<div className="flex w-full items-center justify-between">
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

				<Dialog>
					<DialogTrigger asChild>
						<Button>
							<Plus />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>{dialogTitle}</DialogTitle>
							<DialogDescription>{form}</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>

			{children}
		</div>
	);
};
