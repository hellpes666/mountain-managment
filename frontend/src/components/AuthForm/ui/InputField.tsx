import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { FC, HTMLInputTypeAttribute } from 'react';

interface IInputFieldProps {
	htmlFor: string;
	labelName: string;
	id: string;
	type: HTMLInputTypeAttribute;
	placeholder: string;
	required: boolean;
}

export const InputField: FC<IInputFieldProps> = ({ htmlFor, labelName, id, type, placeholder, required = true }) => {
	return (
		<div className="space-y-2">
			<Label htmlFor={htmlFor}>{labelName}</Label>
			<Input
				id={id}
				type={type}
				placeholder={placeholder}
				className="focus-visible:ring-primary focus-visible:ring-2"
				required={required}
				name={htmlFor}
			/>
		</div>
	);
};
