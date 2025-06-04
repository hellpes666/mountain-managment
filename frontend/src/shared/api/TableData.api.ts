import { useCreatingCharStore } from '@/store/useCreatingChar';
import { useTableDataStore } from '@/store/useTableData';
import type { Area } from '@/types/content-area';
import { queryOptions } from '@tanstack/react-query';

export type TableDataResult<T> = {
	data: T;
};

export type TableDataPayload<T> = {
	payload: T;
};

const store = useTableDataStore.getState();
const createCharStore = useCreatingCharStore.getState();

export const TableDataApi = {
	getTableDataQuery: (area: Area) => {
		return queryOptions({
			queryKey: ['table-data', area],
			queryFn: async () => {
				const res = await store.getData(area);
				return res;
			},
		});
	},

	createChar: async <T>(data: T, area: Area) => {
		await createCharStore.createChar(data, area);
	},
};
