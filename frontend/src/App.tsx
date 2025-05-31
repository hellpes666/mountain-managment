import { Route, Routes } from 'react-router-dom';
import { RoutesAndPagesWithSecure } from './pages/constants/pages';
import { NavigationHeader } from './components/NavigationMenu';
import { ThemeProvider } from './components/ThemeProvider';

export const App = () => {
	return (
		<ThemeProvider
			defaultTheme="dark"
			storageKey="vite-ui-theme"
		>
			<div className="font-family-display bg-background flex min-h-svh w-full flex-col items-center gap-24 px-6 py-2 antialiased md:px-12 md:py-4 lg:px-24 lg:py-6">
				<NavigationHeader />
				<Routes>
					{RoutesAndPagesWithSecure.map(({ href, page }) => (
						<Route
							key={href}
							path={href}
							element={page}
						/>
					))}
				</Routes>
			</div>
		</ThemeProvider>
	);
};
