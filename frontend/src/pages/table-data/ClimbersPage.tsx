import { climberColumns } from '@/components/TableLayout/columns';
import { climberMockData } from '@/components/TableLayout/mock';
import { TableLayout } from '@/components/TableLayout/TableLayout';
import { PageLayout } from './PageLayout';

export const ClimbersPage = () => {
	return (
		<PageLayout
			tableTitle={'Альпинисты'}
			currentBreadcrumbPage={'Данные об альпинистах'}
			exportDataItem={'Альпинисты'}
            dialogTitle="Внести альпиниста"
            area="climbers"
		>
			<TableLayout
				columns={climberColumns}
				data={climberMockData}
				baseUrl="/climbers/"
			/>
		</PageLayout>
	);
};
