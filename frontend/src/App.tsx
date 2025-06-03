import { Route, Routes } from 'react-router-dom';
import { RoutesAndPagesWithSecure } from './pages/constants/pages';
import { ThemeProvider } from './components/ThemeProvider';
import { lazy, Suspense } from 'react';
import { Skeleton } from './components/Skeletons/Skeleton';
import { Loader } from 'lucide-react';

const NavigationHeader = lazy(() =>
	import('./components/NavigationMenu').then((module) => ({
		default: module.NavigationHeader,
	})),
);
const Toaster = lazy(() =>
	import('./components/ui/sonner').then((module) => ({
		default: module.Toaster,
	})),
);

export const App = () => {
	return (
		<ThemeProvider
			defaultTheme="dark"
			storageKey="vite-ui-theme"
		>
			<div className="font-family-display bg-background flex min-h-svh w-full flex-col items-center gap-12 px-6 py-2 antialiased md:px-12 md:py-4 lg:px-24 lg:py-6">
				<Suspense
					fallback={
						<div className="flex w-full animate-pulse items-center justify-between rounded border px-4 py-2">
							<div className="flex items-center gap-5">
								<Skeleton className="mr-10 h-6 w-16" />
								<Skeleton className="h-6 w-18" />
								<Skeleton className="h-6 w-18" />
							</div>
							<div className="flex items-center gap-6">
								<Skeleton className="size-8 rounded-full" />
								<Skeleton className="size-9 rounded" />
							</div>
						</div>
					}
				>
					<NavigationHeader />
				</Suspense>
				<Routes>
					{RoutesAndPagesWithSecure.map(({ href, page: Page }) => (
						<Route
							key={href}
							path={href}
							element={
								<Suspense
									fallback={
										<div className="flex w-full items-center justify-center rounded px-4 py-4">
											<Loader
												className="text-primary animate-spin"
												size={32}
											/>
										</div>
									}
								>
									<Page />
								</Suspense>
							}
						/>
					))}
				</Routes>
				<Suspense fallback={null}>
					<Toaster />
				</Suspense>
			</div>
		</ThemeProvider>
	);
};
