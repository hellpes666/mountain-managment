import { Suspense, type ReactNode } from 'react';

export const PageSkeleton = ({ children }: { children: ReactNode }) => {
	return (
		<Suspense
			fallback={
				<div className="flex w-full animate-pulse flex-col gap-4 px-4 py-2">
					<div className="bg-muted h-8 w-1/3 rounded" />
					<div className="bg-muted h-6 w-1/2 rounded" />
					<div className="bg-muted h-64 w-full rounded" />
				</div>
			}
		>
			{children}
		</Suspense>
	);
};
