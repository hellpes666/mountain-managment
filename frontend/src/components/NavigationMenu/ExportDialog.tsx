import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
const climbers: { title: string; href: string; description: string; key: string }[] = [
	{
		title: 'Альпинисты',
		href: '/climbers/export',
		description: 'Экспорт всех данных об альпинистах',
		key: 'climbers',
	},
	{
		title: 'Группы',
		href: '/groups/export',
		description: 'Экспорт всех данных о группах альпинистов',
		key: 'groups',
	},
	{
		title: 'Горы',
		href: '/mountains/export',
		description: 'Экспорт всех данных о горах',
		key: 'mountains',
	},
];

export const ExportListWithDialogs = () => {
	const [openDialog, setOpenDialog] = useState<string | null>(null);
	const [format, setFormat] = useState<string>('');

	const handleDownload = async () => {
		if (!openDialog || !format) return;
		try {
			const res = await fetch(`http://localhost:3000/export-data/${openDialog}/${format}`);
			if (!res.ok) throw new Error('Ошибка загрузки файла');
			const blob = await res.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${openDialog}.${format === 'excel' ? 'xlsx' : 'csv'}`;
			a.click();
			window.URL.revokeObjectURL(url);
			setOpenDialog(null);
			setFormat('');
		} catch (err) {
			console.error('Ошибка при скачивании', err);
		}
	};

	return (
		<>
			{climbers.map((component) => (
				<li key={component.key}>
					<Dialog
						open={openDialog === component.key}
						onOpenChange={(isOpen) => {
							if (isOpen) {
								setOpenDialog(component.key);
								setFormat(''); // сбросить формат при открытии
							} else {
								setOpenDialog(null);
							}
						}}
					>
						<DialogTrigger asChild>
							<div>
								<h3 className="hover:bg-accent focus:bg-accent block cursor-pointer space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none">
									<div className="text-sm leading-none font-medium">{component.title}</div>
									<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
										{component.description}
									</p>
								</h3>
							</div>
						</DialogTrigger>

						<DialogContent>
							<DialogHeader>
								<DialogTitle>Экспорт: {component.title}</DialogTitle>
								<DialogDescription>Выберите формат данных</DialogDescription>
							</DialogHeader>

							<Select
								onValueChange={setFormat}
								value={format}
							>
								<SelectTrigger>
									<SelectValue placeholder="Выберите формат" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="excel">Excel (.xlsx)</SelectItem>
									<SelectItem value="csv">CSV (.csv)</SelectItem>
								</SelectContent>
							</Select>

							<Button
								onClick={handleDownload}
								disabled={!format}
								className="mt-4 w-full"
								variant="secondary"
							>
								Скачать
							</Button>
						</DialogContent>
					</Dialog>
				</li>
			))}
		</>
	);
};
