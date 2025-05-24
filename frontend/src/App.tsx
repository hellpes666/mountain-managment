import { Users, Mountain, AlertTriangle, File, Table, Group } from 'lucide-react';

import { NavigationHeader } from './components/NavigationMenu/NavigationHeader';
import { ThemeProvider } from './components/ThemeProvider/ThemeProvider';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader } from './components/ui/card';
const features = [
	// Актуальные функции сервиса
	{
		title: 'Учёт альпинистов',
		icon: <Users className="h-6 w-6" />,
		description: 'Полная база данных альпинистов с историей восхождений, медицинскими показателями и квалификацией',
	},
	{
		title: 'Управление группами',
		icon: <Group className="h-6 w-6" />,
		description: 'Формирование групп восхождений, распределение снаряжения и контроль маршрутов',
	},
	{
		title: 'Экстренные контакты',
		icon: <AlertTriangle className="h-6 w-6" />,
		description: 'Мгновенный доступ к экстренным контактам и медицинским данным в критических ситуациях',
	},
	{
		title: 'Отчётность',
		icon: <File className="h-6 w-6" />,
		description: 'Автоматическая генерация отчётов для контролирующих органов и спасательных служб',
	},
	{
		title: 'Таблицы',
		icon: <Table className="h-6 w-6" />,
		description: 'Автоматический экспорт данных в таблицы .csv и .xlsx', // Исправлено расширение
	},
	{
		title: 'Горы',
		icon: <Mountain className="h-6 w-6" />,
		description: 'Управление информацией о горах',
	},
];

export const App = () => {
	return (
		<ThemeProvider
			defaultTheme="dark"
			storageKey="vite-ui-theme"
		>
			<div className="font-family-display bg-background flex min-h-svh w-full flex-col gap-58 px-6 py-2 antialiased md:px-12 md:py-4 lg:px-24 lg:py-6">
				<NavigationHeader />

				<div className="flex flex-col items-center justify-center gap-4">
					<h1 className="text-center text-5xl">Учёт для альпинистских клубов</h1>
					<p className="text-foreground/60">Лёгкий, быстрый и полноценный альпинистский учёт</p>
					<Button className="hover:bg-primary/90 transition-colors">Перейти в сервис</Button>
				</div>

				<div className="bg-card flex flex-col items-start justify-start gap-4 border p-10">
					<h1 className="font-r mb-6 w-full text-center text-3xl">Возможности сервиса</h1>
					<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{features.map((feature, index) => (
							<Card
								key={index}
								className="bg-background transition-shadow duration-300 hover:shadow-md"
							>
								<CardHeader className="flex flex-row items-center gap-4 pb-2">
									<div className="bg-primary/10 rounded-full p-2">{feature.icon}</div>
									<h3 className="text-lg font-semibold">{feature.title}</h3>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground text-sm">{feature.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
};
