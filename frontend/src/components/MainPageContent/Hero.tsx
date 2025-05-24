import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { RoutesEnum } from '@/routes/routes';

import type { ReactNode } from 'react';

export const Hero = ({ title, subtitle, link }: { title: ReactNode; subtitle: string; link: boolean }) => {
	return (
		<section className="flex flex-col items-center justify-center gap-4 text-center">
			<h1 className="text-5xl">{title}</h1>
			<p className="text-foreground/60">{subtitle}</p>
			{link && (
				<Button className="hover:bg-primary/90 transition-colors">
					<Link to={RoutesEnum.Service}>Перейти в сервис</Link>
				</Button>
			)}
		</section>
	);
};
