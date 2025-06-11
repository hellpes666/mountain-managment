import { useCharStore } from '@/store/useCharStore';
import type { Area, AreaEntityMap } from '@/types/content-area';
import { queryOptions } from '@tanstack/react-query';

export type CharResult<T> = {
	data: T;
};

export type CharPayload<T> = {
	payload: T;
};

const store = useCharStore.getState();

export const CharApi = {
	getCharQuery: <T extends Area>(area: T, id: string) => {
		return queryOptions({
			queryKey: ['char-data', area, id],
			queryFn: async (): Promise<AreaEntityMap[T]> => {
				const res = await store.getCharData(area, id);
				return res;
			},
		});
	},
};
