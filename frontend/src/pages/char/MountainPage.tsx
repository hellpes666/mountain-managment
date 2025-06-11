import { CharApi } from '@/shared/api/Char.api';
import { Spinner } from '@/shared/ui/Spinner';
import { AREA_MAPPING, type Area } from '@/types/content-area';
import { useQuery } from '@tanstack/react-query';
import { CharLayout } from '@/components/CharLayout';
import { CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MountainIcon, Ruler, Globe, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MountainPage = () => {
	const [area, id] = window.location.pathname.split('/').filter(Boolean) as [Area, string];

	const { data, isLoading, error } = useQuery({
		...CharApi.getCharQuery('mountains', id),
		enabled: !!area && !!id,
	});

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
					<div className="flex items-start gap-3">
						<MountainIcon className="text-muted-foreground mt-1 h-5 w-5" />
						<div>
							<p className="text-muted-foreground text-sm">Название</p>
							<p className="font-medium">{data.name}</p>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Ruler className="text-muted-foreground mt-1 h-5 w-5" />
						<div>
							<p className="text-muted-foreground text-sm">Высота</p>
							<p className="font-medium">{data.height} м</p>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Globe className="text-muted-foreground mt-1 h-5 w-5" />
						<div>
							<p className="text-muted-foreground text-sm">Страна</p>
							<p className="font-medium">{data.country}</p>
						</div>
					</div>

					{data.region && (
						<div className="flex items-start gap-3">
							<Landmark className="text-muted-foreground mt-1 h-5 w-5" />
							<div>
								<p className="text-muted-foreground text-sm">Регион</p>
								<p className="font-medium">{data.region}</p>
							</div>
						</div>
					)}
				</div>

				<div className="bg-foreground/60 my-5 h-0.5 w-full rounded-4xl"></div>

				<div>
					<p className="text-muted-foreground mb-2 text-sm">Связанные группы</p>
					{data.groups.length > 0 ? (
						<ul className="list-inside list-disc space-y-1 text-sm">
							{data.groups.map((group) => (
								<li
									key={group.id}
									className="text-foreground"
								>
									<Link
										to={`/groups/${group.id}`}
										className="hover:underline"
									>
										{group.name}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p className="text-muted-foreground text-sm font-medium">Нет связанных групп</p>
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
