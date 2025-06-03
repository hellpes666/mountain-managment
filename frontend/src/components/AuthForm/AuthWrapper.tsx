import type { ReactNode } from 'react';

export const AuthWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<div className="bg-background flex min-h-[460px] min-w-[460px] items-center justify-center px-4">
			<div className="border-border animate-fade-in w-full max-w-md space-y-6 rounded-xl border p-8 shadow-sm">
				{children}
			</div>
		</div>
	);
};
