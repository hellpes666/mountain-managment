import type { Area } from '@/types/content-area';
import { toast } from 'sonner';
import { create } from 'zustand';

interface ICharState {
	isLoading: boolean;
	data: any;
}

interface ICharActions {
	getCharData: (area: Area, id: string) => Promise<any>;
}

const initState: ICharState = {
	isLoading: false,
	data: {},
};

type CharStore = ICharState & ICharActions;

const BASE_URL = 'http://localhost:3000';

export const useCharStore = create<CharStore>((set) => ({
	...initState,

	getCharData: async (area: Area, id: string) => {
		try {
			set({ isLoading: true });

			const response = await fetch(`${BASE_URL}/${area}/${id}`, {
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
