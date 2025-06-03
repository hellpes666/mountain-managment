import { InputField } from '@/components/AuthForm/ui/InputField';
import { Hero } from '@/components/MainPageContent';
import { FormWrapper } from '@/components/shared/FormWrapper';
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
}: {
	children: ReactNode;
	tableTitle: string;
	currentBreadcrumbPage: string;
	exportDataItem: ReactNode;
	dialogTitle: string;
	area: Area;
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
					<DialogTrigger>
						<Button>
							<Plus />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>{dialogTitle}</DialogTitle>
							<DialogDescription>
								<FormWrapper>
									<form
										className="space-y-4"
										action={submitForm}
									>
										<InputField
											htmlFor="email"
											labelName="Email"
											id="email"
											type="email"
											placeholder="Введите ваш email"
										/>

										<InputField
											htmlFor="password"
											labelName="Пароль"
											id="password"
											type="password"
											placeholder="Введите ваш пароль"
										/>

										<Button
											className="mt-2 w-full"
											type="submit"
											variant="secondary"
										>
											Создать
										</Button>
									</form>
								</FormWrapper>
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>

			{children}
		</div>
	);
};
