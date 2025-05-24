// App.tsx
import { Route, Routes } from 'react-router-dom';
import { RoutesAndPagesWithSecure } from './pages/constants/pages';
import { NavigationHeader } from './components/NavigationMenu';
import { ThemeProvider } from './components/ThemeProvider';
import { ProtectedRoute } from './routes/ProtectedRoute';

export const App = () => {
	return (
		<ThemeProvider
			defaultTheme="dark"
			storageKey="vite-ui-theme"
		>
			<div className="font-family-display bg-background flex min-h-svh w-full flex-col gap-24 px-6 py-2 antialiased md:px-12 md:py-4 lg:px-24 lg:py-6">
				<NavigationHeader />
				<Routes>
					{RoutesAndPagesWithSecure.map(({ href, secure, page }) => (
						<Route
							key={href}
							path={href}
							element={secure ? <ProtectedRoute>{page}</ProtectedRoute> : page}
						/>
					))}
				</Routes>
			</div>
		</ThemeProvider>
	);
};
