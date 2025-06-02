import { groupColumns } from '@/components/TableLayout/columns';
import { groupMockData } from '@/components/TableLayout/mock';
import { TableLayout } from '@/components/TableLayout/TableLayout';
import { PageLayout } from './PageLayout';

export const GroupsPage = () => {
	return (
		<PageLayout
			tableTitle={'Группы'}
			currentBreadcrumbPage={'Данные о группах'}
			exportDataItem={'Группы'}
		>
			<TableLayout
				columns={groupColumns}
				data={groupMockData}
			/>
		</PageLayout>
	);
};
