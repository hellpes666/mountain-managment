import React from 'react';

import { NavigationMenuLink } from '../ui/navigation-menu';
import { cn } from '@/lib/utils';

export const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
							className,
						)}
						{...props}
					>
						<div className="text-sm leading-none font-medium">{title}</div>
						<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">{children}</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	},
);
ListItem.displayName = 'ListItem';
