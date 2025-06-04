import type { Area } from '@/types/content-area';
import { toast } from 'sonner';
import { create } from 'zustand';

interface ICreatingCharState {
	isLoading: boolean;
}

interface ICreatingCharActions {
	createChar: <T>(data: T, area: Area) => Promise<void>;
}

const InitState: ICreatingCharState = {
	isLoading: false,
};

type CreatingCharStore = ICreatingCharState & ICreatingCharActions;

const BASE_URL = 'http://localhost:3000/';

export const useCreatingCharStore = create<CreatingCharStore>((set) => ({
	...InitState,

	createChar: async <T>(data: T, area: Area) => {
		try {
			set({ isLoading: true });

			const response = await fetch(`${BASE_URL}${area}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.message);
			}

			toast.success('Успешно внесено в базу данных!');
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
