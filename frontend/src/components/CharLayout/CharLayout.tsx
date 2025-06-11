import { type ReactNode } from 'react';
import { Card } from '../ui/card';

export const CharLayout = ({ children }: { children: ReactNode }) => {
	return <Card className="w-full">{children}</Card>;
};
