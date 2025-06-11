import { CharLayout } from '@/components/CharLayout';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CharApi } from '@/shared/api/Char.api';
import { Spinner } from '@/shared/ui/Spinner';
import { AREA_MAPPING, type Area } from '@/types/content-area';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Phone, UserCircle2, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ClimberPage = () => {
	const [area, id] = window.location.pathname.split('/').filter(Boolean) as [Area, string];

	const { data, isLoading, error } = useQuery({
		...CharApi.getCharQuery('climbers', id),
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
					<span className="font-normal">{AREA_MAPPING[area]}:</span> {data.fullName}
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
						<UserCircle2 className="text-muted-foreground mt-1 h-5 w-5" />
						<div>
							<p className="text-muted-foreground text-sm">ФИО</p>
							<p className="font-medium">{data.fullName}</p>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<MapPin className="text-muted-foreground mt-1 h-5 w-5" />
						<div>
							<p className="text-muted-foreground text-sm">Адрес</p>
							<p className="font-medium">{data.address}</p>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Phone className="text-muted-foreground mt-1 h-5 w-5" />
						<div>
							<p className="text-muted-foreground text-sm">Телефон</p>
							<p className="font-medium">{data.phoneNumber}</p>
						</div>
					</div>

					<div className="flex items-start gap-3">
						<Clock className="text-muted-foreground mt-1 h-5 w-5" />
						<div>
							<p className="text-muted-foreground text-sm">Создан</p>
							<p className="font-medium">{new Date(data.createdAt).toLocaleDateString()}</p>
						</div>
					</div>
				</div>
				<div className="bg-foreground/60 my-5 h-0.5 w-full rounded-4xl"></div>
				<div>
					<p className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
						<AlertTriangle className="h-4 w-4 text-yellow-600" />
						Контакты ЧС
					</p>

					{data.emergencyContacts.length > 0 ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									className="w-full justify-between text-left sm:w-64"
								>
									Выбрать контакт
								</Button>
							</DropdownMenuTrigger>

							<DropdownMenuContent className="w-64">
								<DropdownMenuLabel>Контакты:</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{data.emergencyContacts.map((contact) => (
									<DropdownMenuItem
										key={contact.id}
										asChild
									>
										<Link
											to={`/emergency-contacts/${contact.id}`}
											className="hover:bg-secondary w-full rounded-md px-2 py-2 transition-colors"
										>
											<div className="flex flex-col gap-1">
												<p className="font-medium text-white">{contact.fullName}</p>

												<div className="text-muted-foreground flex items-center gap-2 text-sm">
													<a
														href={`tel:${contact.phoneNumber}`}
														onClick={(e) => e.stopPropagation()}
														className="text-white underline underline-offset-2 hover:text-blue-300"
													>
														{contact.phoneNumber}
													</a>
												</div>

												<p className="text-xs text-white">
													{contact.relationship || 'Отношение не указано'}
												</p>
											</div>
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<p className="text-muted-foreground text-sm font-medium">—</p>
					)}
				</div>
			</CardContent>

			<CardFooter>
				<p className="text-muted-foreground text-sm">Связан с профилем: {data.userId}</p>
			</CardFooter>
		</CharLayout>
	);
};
