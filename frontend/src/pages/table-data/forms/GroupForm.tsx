import { InputField } from '@/components/AuthForm/ui/InputField';
import { FormWrapper } from '@/components/shared/FormWrapper';
import { Button } from '@/components/ui/button';
import { TableDataApi } from '@/shared/api/TableData.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Mountain } from '@/entity';
import { Spinner } from '@/shared/ui/Spinner';
import type { GroupOption } from '@/entity/group';

export const GroupForm = () => {
	const dialogRef = useRef<HTMLButtonElement>(null);
	const queryClient = useQueryClient();

	const { data: mountains, isLoading: isMountainsLoading } = useQuery(TableDataApi.getTableDataQuery('mountains'));

	const mutation = useMutation({
		mutationFn: (data: GroupOption) => TableDataApi.createChar(data, 'groups'),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['table-data', 'groups'] });
			if (dialogRef.current) dialogRef.current.click();
		},
	});

	async function submitForm(formData: FormData) {
		const data: GroupOption = {
			name: formData.get('groupName') as string,
			startDate: formData.get('startDate') as string,
			endDate: formData.get('endDate') as string,
			mountainId: formData.get('mountainIds') as string,
		};
		console.log(data);
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
						htmlFor="groupName"
						labelName="Название группы"
						id="groupName"
						type="text"
						placeholder="Ам-нямы"
						required
					/>
					<InputField
						htmlFor="startDate"
						labelName="Дата начала восхождения"
						id="startDate"
						type="date"
						placeholder="28.10.2025"
						required={false}
					/>
					<InputField
						htmlFor="endDate"
						labelName="Дата окончания экспедиции"
						id="endDate"
						type="date"
						placeholder="05.11.2025"
						required={false}
					/>
					<div>
						<label
							className="mb-1 block font-medium"
							htmlFor="mountainIds"
						>
							Гора
						</label>
						{isMountainsLoading ? (
							<Spinner text="Горы загружаются" />
						) : (
							<Select
								name="mountainIds"
								required
							>
								<SelectTrigger>
									<SelectValue placeholder="Выберите гору" />
								</SelectTrigger>
								<SelectContent>
									{mountains && mountains.length > 0 ? (
										mountains.map((mountain: Mountain) => (
											<SelectItem
												key={mountain.id}
												value={mountain.id}
											>
												{mountain.name}
											</SelectItem>
										))
									) : (
										<SelectItem
											disabled
											value={'non'}
										>
											Горы не найдены
										</SelectItem>
									)}
								</SelectContent>
							</Select>
						)}
					</div>
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
