import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mountain, Users, User, Phone, Compass, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const cards = [
	{
		title: 'Альпинисты',
		description: 'Просматривайте и управляйте списком альпинистов. Доступен экспорт данных.',
		route: 'climbers',
		icon: User,
		color: 'bg-accent text-accent-foreground',
	},
	{
		title: 'Группы',
		description: 'Информация о группах, участвующих в восхождениях.',
		route: 'groups',
		icon: Users,
		color: 'bg-accent text-accent-foreground',
	},
	{
		title: 'Горы',
		description: 'Доступные вершины, маршруты и уровни сложности.',
		route: 'mountains',
		icon: Mountain,
		color: 'bg-accent text-accent-foreground',
	},
	{
		title: 'Экстренные контакты',
		description: 'Контакты спасательных служб и координаторов.',
		route: 'emergency-contacts/export-data',
		icon: Phone,
		color: 'bg-accent text-accent-foreground',
	},
	{
		title: 'Профиль',
		description: 'Редактируйте свои данные и настраивайте аккаунт.',
		route: 'profile/@me',
		icon: Compass,
		color: 'bg-accent text-accent-foreground',
	},
	{
		title: 'Экспорт данных',
		description: 'Быстрый экспорт ключевых данных из системы.',
		route: 'climbers/export-data',
		icon: Download,
		color: 'bg-accent text-accent-foreground',
	},
];

export const ServiceCards = () => {
	const navigate = useNavigate();

	return (
		<div className="mt-4 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{cards.map((card, index) => {
				const Icon = card.icon;
				return (
					<Card
						key={index}
						className={cn(
							'group flex flex-col justify-between rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md',
						)}
					>
						<div className="mb-4 flex items-center gap-3">
							<div className={cn('rounded-md p-2', card.color)}>
								<Icon className="h-5 w-5" />
							</div>
							<CardTitle className="text-xl font-semibold">{card.title}</CardTitle>
						</div>
						<CardDescription className="text-muted-foreground mb-6 text-sm">
							{card.description}
						</CardDescription>
						<CardContent className="mt-auto p-0">
							<Button
								onClick={() => navigate(`/${card.route}`)}
								variant="default"
								className="w-full group-hover:opacity-90"
							>
								Перейти
							</Button>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
};
