import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { RoutesEnum } from '@/routes/routes';

import type { ReactNode } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Loader } from 'lucide-react';

export const Hero = ({ title, subtitle, link }: { title: ReactNode; subtitle: string; link: boolean }) => {
	const { isAuthorized, isLoading } = useAuthStore();

	if (isLoading) {
		return (
			<div className="flex w-full items-center justify-center rounded border px-4 py-4">
				<Loader
					className="text-primary animate-spin"
					size={32}
				/>
			</div>
		);
	}

	return (
		<section className="flex flex-col items-center justify-center gap-4 text-center">
			<h1 className="text-5xl">{title}</h1>
			<p className="text-foreground/60">{subtitle}</p>
			{link && (
				<Button
					className="hover:bg-primary/90 cursor-pointer transition-colors"
					disabled={!isAuthorized}
				>
					<Link to={RoutesEnum.Service}>Перейти в сервис</Link>
				</Button>
			)}
		</section>
	);
};
