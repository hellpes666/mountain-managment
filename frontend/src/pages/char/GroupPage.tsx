import { CharApi } from '@/shared/api/Char.api';
import { Spinner } from '@/shared/ui/Spinner';
import { AREA_MAPPING, type Area } from '@/types/content-area';
import { useQuery } from '@tanstack/react-query';
import { CharLayout } from '@/components/CharLayout';
import { CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MountainIcon, Users, CalendarDays, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GroupPage = () => {
	const [area, id] = window.location.pathname.split('/').filter(Boolean) as [Area, string];

	const { data, isLoading, error } = useQuery({
		...CharApi.getCharQuery('groups', id),
		enabled: !!area && !!id,
	});
	console.log(data);

	if (isLoading) {
		return <Spinner />;
	}

	if (error || !data) {
		return <div>Ошибка загрузки данных</div>;
	}

	return (
		<CharLayout>
			<CardHeader>
				<CardTitle>
					<span className="font-normal">{AREA_MAPPING[area]}:</span> {data.name}
				</CardTitle>
				<CardDescription>
					<span className="font-normal">ID: {id}</span>
				</CardDescription>
				<CardAction>
					<Button
						variant="link"
						onClick={() => window.history.back()}
					>
						Вернуться к таблице
					</Button>
				</CardAction>
			</CardHeader>

			<CardContent>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{data.mountain && (
						<div className="flex items-center gap-3">
							<MountainIcon className="text-muted-foreground h-5 w-5" />
							<div>
								<p className="text-muted-foreground text-sm">Гора</p>
								<Link
									to={`/mountains/${data.mountain.id}`}
									className="font-medium hover:underline"
								>
									{data.mountain.name} ({data.mountain.height} м)
								</Link>
								<p className="text-muted-foreground text-xs">
									{data.mountain.region}, {data.mountain.country}
								</p>
							</div>
						</div>
					)}

					<div className="flex items-center gap-3">
						<CalendarDays className="text-muted-foreground h-5 w-5" />
						<div>
							<p className="text-muted-foreground text-sm">Период экспедиции</p>
							<p className="font-medium">
								{data.startDate} — {data.endDate}
							</p>
						</div>
					</div>
				</div>

				<div className="my-5 border-t border-gray-600" />

				<div>
					<p className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
						<Users className="h-4 w-4" />
						Участники группы
					</p>

					{data.climbers.length > 0 ? (
						<ul className="flex space-x-2">
							{data.climbers.map((climber) => (
								<li
									key={climber.fullName}
									className="text-foreground flex w-full flex-col items-start gap-2 rounded-md border p-4"
								>
									<Link
										to={`/climbers/${climber.id}`}
										className="font-medium hover:underline"
									>
										{climber.fullName}
									</Link>
									<p className="text-muted-foreground text-xs">{climber.address}</p>
									<p className="flex items-center gap-1 text-xs">
										<Phone className="h-3 w-3" />
										<a
											href={`tel:${climber.phoneNumber}`}
											className="underline hover:text-blue-400"
										>
											{climber.phoneNumber}
										</a>
									</p>
								</li>
							))}
						</ul>
					) : (
						<p className="text-muted-foreground text-sm font-medium">Нет участников</p>
					)}
				</div>
			</CardContent>

			<CardFooter>
				<p className="text-muted-foreground text-sm">
					Создано: {new Date(data.createdAt).toLocaleDateString()}
				</p>
			</CardFooter>
		</CharLayout>
	);
};
