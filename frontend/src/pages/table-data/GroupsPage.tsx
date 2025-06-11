import { groupColumns } from '@/components/TableLayout/columns';
import { TableLayout } from '@/components/TableLayout/TableLayout';
import { PageLayout } from './PageLayout';
import { GroupForm } from './forms/GroupForm';
import { TableDataApi } from '@/shared/api/TableData.api';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/shared/ui/Spinner';

export const GroupsPage = () => {
	const { data, isLoading } = useQuery(TableDataApi.getTableDataQuery('groups'));
	return (
		<PageLayout
			tableTitle={'Группы'}
			currentBreadcrumbPage={'Данные о группах'}
			exportDataItem={'Группы'}
			dialogTitle="Создать новую группу"
			area="groups"
			form={<GroupForm />}
		>
			{isLoading ? (
				<Spinner text="Загружаем группы..." />
			) : (
				<TableLayout
					columns={groupColumns}
					data={data ?? []}
					baseUrl="/groups"
				/>
			)}
		</PageLayout>
	);
};
