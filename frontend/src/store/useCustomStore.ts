import { create } from "zustand";

interface ICustomState {
	something: unknown;
	addSomething: (data: unknown) => void;
}

export const useCustomStore = create<ICustomState>((set) => ({
	something: null,
	addSomething: (data: unknown) => {
		set({ something: data });
	},
}));
