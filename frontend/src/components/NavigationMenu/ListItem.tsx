import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

interface ListItemProps {
	title: string;
	to: string;
	children: React.ReactNode;
}

export function ListItem({ title, to, children }: ListItemProps) {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					to={to}
					className="hover:bg-accent focus:bg-accent block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
				>
					<div className="text-sm leading-none font-medium">{title}</div>
					<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
}
