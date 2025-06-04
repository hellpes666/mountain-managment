import type { Area } from '@/types/content-area';
import { toast } from 'sonner';
import { create } from 'zustand';

interface ICreatingCharState {
	isLoading: boolean;
	data: any;
}

interface ITableDataActions {
	getData: (area: Area) => Promise<any>;
}

const InitState: ICreatingCharState = {
	isLoading: false,
	data: {},
};

type CreatingCharStore = ICreatingCharState & ITableDataActions;

const BASE_URL = 'http://localhost:3000/';

export const useTableDataStore = create<CreatingCharStore>((set) => ({
	...InitState,

	getData: async (area: Area) => {
		try {
			set({ isLoading: true });

			const response = await fetch(`${BASE_URL}${area}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.message);
			}

			set({ data: result });
			return result;
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: typeof error === 'string'
						? error
						: 'Неизвестная ошибка. Попробуйте снова';
			toast.error(message);
		} finally {
			set({ isLoading: false });
		}
	},
}));
