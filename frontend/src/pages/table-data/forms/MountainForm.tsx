import { InputField } from '@/components/AuthForm/ui/InputField';
import { FormWrapper } from '@/components/shared/FormWrapper';
import { Button } from '@/components/ui/button';
import type { MountainFormData } from '@/entity/mountain';
import { TableDataApi } from '@/shared/api/TableData.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

export const MountainForm = () => {
	const dialogRef = useRef<HTMLButtonElement>(null);
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data: MountainFormData) => TableDataApi.createChar(data, 'mountains'),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['table-data', 'mountains'] });

			if (dialogRef.current) {
				dialogRef.current.click();
			}
		},
	});

	async function submitForm(formData: FormData) {
		const data: MountainFormData = {
			name: formData.get('mountainName') as string,
			height: Number(formData.get('mountainHeight')) as number,
			country: formData.get('mountainCountry') as string,
			region: formData.get('mountainRegion') as string,
		};

		mutation.mutate(data);
	}
	return (
		<>
			<button
				ref={dialogRef}
				type="button"
				className="hidden"
				data-close-dialog
			/>
			<FormWrapper>
				<form
					className="space-y-4"
					action={submitForm}
				>
					<InputField
						htmlFor="mountainName"
						labelName="Название горы"
						id="mountainName"
						type="text"
						placeholder="Эверест"
						required
					/>
					<InputField
						htmlFor="mountainHeight"
						labelName="Высота горы (м)"
						id="mountainHeight"
						type="number"
						placeholder="8848"
						required
					/>
					<InputField
						htmlFor="mountainCountry"
						labelName="Страна горы "
						id="mountainCountry"
						type="text"
						placeholder="Непал"
						required
					/>
					<InputField
						htmlFor="mountainRegion"
						labelName="Регион страны"
						id="mountainRegion"
						type="text"
						placeholder="Сагарматха"
						required
					/>
					<Button
						className="mt-2 w-full cursor-pointer"
						type="submit"
						variant="secondary"
					>
						Создать
					</Button>
				</form>
			</FormWrapper>
		</>
	);
};
