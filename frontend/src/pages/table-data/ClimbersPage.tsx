import { climberColumns } from '@/components/TableLayout/columns';
import { TableLayout } from '@/components/TableLayout/TableLayout';
import { PageLayout } from './PageLayout';
import { ClimberForm } from './forms/ClimberForm';
import { Spinner } from '@/shared/ui/Spinner';
import { TableDataApi } from '@/shared/api/TableData.api';
import { useQuery } from '@tanstack/react-query';

export const ClimbersPage = () => {
	const { data, isLoading } = useQuery(TableDataApi.getTableDataQuery('climbers'));
	return (
		<PageLayout
			tableTitle={'Альпинисты'}
			currentBreadcrumbPage={'Данные об альпинистах'}
			exportDataItem={'Альпинисты'}
			dialogTitle="Внести альпиниста"
			area="climbers"
			form={<ClimberForm />}
		>
			{isLoading ? (
				<Spinner text="Загружаем горы..." />
			) : (
				<TableLayout
					columns={climberColumns}
					data={data ?? []}
					baseUrl="/climbers"
				/>
			)}
		</PageLayout>
	);
};
