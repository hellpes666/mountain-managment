import React from 'react';

interface IFormTitleProps {
	title: string;
	subtitle?: string;
}

export const FormTitle: React.FC<IFormTitleProps> = ({ title, subtitle }) => {
	return (
		<div className="text-center">
			<h1 className="text-3xl font-bold">{title}</h1>
			{subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
		</div>
	);
};
