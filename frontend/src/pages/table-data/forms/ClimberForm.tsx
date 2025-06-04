import { InputField } from '@/components/AuthForm/ui/InputField';
import { FormWrapper } from '@/components/shared/FormWrapper';
import { Button } from '@/components/ui/button';
import { TableDataApi } from '@/shared/api/TableData.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Group, User } from '@/entity';
import type { ClimberFormData } from '@/entity/climber';
import { Spinner } from '@/shared/ui/Spinner';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ClimberForm = () => {
	const dialogRef = useRef<HTMLButtonElement>(null);
	const queryClient = useQueryClient();

	const { data: users, isLoading: isUsersLoading } = useQuery(TableDataApi.getTableDataQuery('users'));

	const { data: groups, isLoading: isGroupsLoading } = useQuery(TableDataApi.getTableDataQuery('groups'));

	const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

	const toggleGroupSelection = (groupId: string) => {
		setSelectedGroups((prev) =>
			prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId],
		);
	};

	const mutation = useMutation({
		mutationFn: (data: ClimberFormData) => TableDataApi.createChar(data, 'climbers'),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['table-data', 'climbers'] });
			if (dialogRef.current) dialogRef.current.click();
		},
	});

	async function submitForm(formData: FormData) {
		const data: ClimberFormData = {
			fullName: formData.get('fullName') as string,
			address: formData.get('address') as string,
			phoneNumber: formData.get('phoneNumber') as string,
			groupIds: formData.getAll('groupIds') as string[],
			userId: formData.get('userId') as string,
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
						htmlFor="fullName"
						labelName="ФИО"
						id="fullName"
						type="text"
						placeholder="Иванов Иван Иванович"
						required
					/>
					<InputField
						htmlFor="address"
						labelName="Адрес"
						id="address"
						type="text"
						placeholder="г. Москва, ул. Ленина, д. 1"
						required
					/>
					<InputField
						htmlFor="phoneNumber"
						labelName="Телефон"
						id="phoneNumber"
						type="tel"
						placeholder="+7 (999) 123-45-67"
						title="Формат: +7 (999) 123-45-67"
						required
					/>

					<div>
						<label
							className="mb-1 block font-medium"
							htmlFor="groupIds"
						>
							Группы
						</label>
						{isGroupsLoading ? (
							<Spinner text="Группы загружаются" />
						) : (
							<>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="outline"
											className="w-full justify-between"
										>
											{selectedGroups.length > 0
												? `Выбрано: ${selectedGroups.length}`
												: 'Выберите группы'}
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="max-h-60 w-64 overflow-auto">
										{groups && groups.length > 0 ? (
											groups.map((group: Group) => (
												<DropdownMenuCheckboxItem
													key={group.id}
													checked={selectedGroups.includes(group.id)}
													onCheckedChange={() => toggleGroupSelection(group.id)}
												>
													{group.name}
												</DropdownMenuCheckboxItem>
											))
										) : (
											<DropdownMenuCheckboxItem
												disabled
												checked={false}
											>
												Группы не найдены
											</DropdownMenuCheckboxItem>
										)}
									</DropdownMenuContent>
								</DropdownMenu>

								{selectedGroups.map((groupId) => (
									<input
										key={groupId}
										type="hidden"
										name="groupIds"
										value={groupId}
									/>
								))}
							</>
						)}
					</div>
					<div>
						<label
							className="mb-1 block font-medium"
							htmlFor="userId"
						>
							Пользователь
						</label>
						{isUsersLoading ? (
							<Spinner text="Пользователи загружаются" />
						) : (
							<Select
								name="userId"
								required
							>
								<SelectTrigger>
									<SelectValue placeholder="Выберите пользователя" />
								</SelectTrigger>
								<SelectContent>
									{users && users.length > 0 ? (
										users.map((user: User) => (
											<SelectItem
												key={user.id}
												value={user.id}
											>
												<b>{user.firstName + ' ' + user.lastName}</b> {'- ' + user.email}
											</SelectItem>
										))
									) : (
										<SelectItem
											disabled
											value={'non'}
										>
											Пользователи не найдены
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
