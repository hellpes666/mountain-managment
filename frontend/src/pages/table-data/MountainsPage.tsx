import { mountainColumns } from '@/components/TableLayout/columns';
import { mountainMockData } from '@/components/TableLayout/mock';

import { PageLayout } from './PageLayout';
import { TableLayout } from '@/components/TableLayout/TableLayout';

export const MountainsPage = () => {
	return (
		<PageLayout
			tableTitle={'Горы'}
			currentBreadcrumbPage={'Данные о горах'}
			exportDataItem={'Горы'}
			dialogTitle="Создать новую гору"
			area="mountains"
		>
			<TableLayout
				columns={mountainColumns}
				data={mountainMockData}
				baseUrl="/mountains/"
			/>
		</PageLayout>
	);
};
