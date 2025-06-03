import type { FC } from 'react';
import { Link } from 'react-router-dom';

interface IOppositeActionProps {
	title: string;
	link: string;
	linkName: string;
}

export const OppositeAction: FC<IOppositeActionProps> = ({ title, link, linkName }) => {
	return (
		<div className="flex flex-1 flex-col justify-end">
			<div className="text-muted-foreground mt-8 text-center text-sm">
				{title}{' '}
				<Link
					to={link}
					className="hover:text-foreground underline"
				>
					{linkName}
				</Link>
			</div>
		</div>
	);
};
