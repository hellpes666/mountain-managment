import type { Area } from '@/types/content-area';
import { toast } from 'sonner';
import { create } from 'zustand';

interface IOpenCreatingCharState {
	isLoading: boolean;
	currentArea: Area | null;
}

interface IOpenCreatingCharActions {
	setCurrentArea: (area: Area) => void;
	createChar: <T>(data: T) => void;
}

const InitState: IOpenCreatingCharState = {
	isLoading: false,
	currentArea: null,
};

type AuthStore = IOpenCreatingCharState & IOpenCreatingCharActions;

const BASE_URL = 'http://localhost:3000/';

export const useAuthStore = create<AuthStore>((set) => ({
	...InitState,

	setCurrentArea: (area) => {
		set({ currentArea: area });
	},
	createChar: (data) => {},
}));
