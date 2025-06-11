import { Loader2 } from 'lucide-react';

export const Spinner = ({ text }: { text?: string }) => {
	return (
		<div className="text-muted-foreground flex flex-col items-center justify-center py-12">
			<Loader2 className="mb-2 h-6 w-6 animate-spin" />
			{text && <span className="text-sm">{text}</span>}
		</div>
	);
};
