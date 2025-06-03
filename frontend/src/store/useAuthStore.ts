import type { LoginData, RegisterData } from '@/types/auth';
import { toast } from 'sonner';
import { create } from 'zustand';

interface IAuthState {
	isAuthorized: boolean;
	isLoading: boolean;
	email: string | null;
	firstName: string | null;
	lastName: string | null;
	createdAt: Date | null;
}

interface IAuthActions {
	login: (data: LoginData) => void;
	register: (data: RegisterData) => void;
	checkAuth: () => void;
	logout: () => void;
}

const InitState: IAuthState = {
	isAuthorized: false,
	isLoading: false,
	email: null,
	firstName: null,
	lastName: null,
	createdAt: null,
};

type AuthStore = IAuthState & IAuthActions;

const BASE_URL = 'http://localhost:3000/auth';

export const useAuthStore = create<AuthStore>((set) => ({
	...InitState,
	login: async (data: LoginData) => {
		try {
			set({ isLoading: true });

			const response = await fetch(`${BASE_URL}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new (result.message || 'Ошибка входа')();
			} else {
				set({
					isAuthorized: true,
					email: result.user.email,
					firstName: result.user.firstName,
					lastName: result.user.lastName,
					createdAt: result.user.createdAt ? new Date(result.user.createdAt) : null,
				});
				window.location.href = '/';
				return result;
			}
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

	register: async (data: RegisterData) => {
		try {
			set({ isLoading: true });
			const response = await fetch(`${BASE_URL}/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(data),
				redirect: 'follow',
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.message || 'Ошибка входа');
			} else {
				set({
					isAuthorized: true,
					email: result.user.email,
					firstName: result.user.firstName,
					lastName: result.user.lastName,
					createdAt: result.user.createdAt ? new Date(result.user.createdAt) : null,
				});
				window.location.href = '/';
				return result;
			}
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
	checkAuth: async () => {
		try {
			set({ isLoading: true });

			const response = await fetch(BASE_URL, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				redirect: 'follow',
			});

			const result = await response.json().then((data) => data);

			if (result['email']) {
				set({
					isAuthorized: true,
					email: result.email,
					firstName: result.firstName,
					lastName: result.lastName,
					createdAt: result.createdAt ? new Date(result.createdAt) : null,
				});
			}

			return result;
		} catch (e) {
			console.log(e);
		} finally {
			set({ isLoading: false });
		}
	},

	logout: async () => {
		try {
			set({ isLoading: true });

			const response = await fetch(`${BASE_URL}/logout`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				redirect: 'follow',
			});

			const result = await response.json();
			if (result) {
				set({
					isAuthorized: false,
					email: '',
					firstName: '',
					lastName: '',
					createdAt: null,
				});
			}

			return result;
		} catch (e) {
			console.log(e);
		} finally {
			set({ isLoading: false });
		}
	},
}));
