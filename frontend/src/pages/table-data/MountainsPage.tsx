import { mountainColumns } from '@/components/TableLayout/columns';

import { PageLayout } from './PageLayout';
import { TableLayout } from '@/components/TableLayout/TableLayout';
import { MountainForm } from './forms/MountainForm';
import { useQuery } from '@tanstack/react-query';
import { TableDataApi } from '@/shared/api/TableData.api';

import { Spinner } from '@/shared/ui/Spinner';

export const MountainsPage = () => {
	const { data, isLoading } = useQuery(TableDataApi.getTableDataQuery('mountains'));
	return (
		<PageLayout
			tableTitle={'Горы'}
			currentBreadcrumbPage={'Данные о горах'}
			exportDataItem={'Горы'}
			dialogTitle="Создать новую гору"
			area="mountains"
			form={<MountainForm />}
		>
			{isLoading ? (
				<Spinner text="Загружаем горы..." />
			) : (
				<TableLayout
					columns={mountainColumns}
					data={data ?? []}
					baseUrl="/mountains"
				/>
			)}
		</PageLayout>
	);
};
