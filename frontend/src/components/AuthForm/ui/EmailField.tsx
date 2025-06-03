import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const EmailField = () => {
	return (
		<div className="space-y-2">
			<Label htmlFor="email">Email</Label>
			<Input
				id="email"
				type="email"
				placeholder="you@example.com"
				className="focus-visible:ring-primary focus-visible:ring-2"
				required
			/>
		</div>
	);
};
