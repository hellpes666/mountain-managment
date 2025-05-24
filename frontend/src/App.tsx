import { NavigationHeader } from './components/NavigationMenu/NavigationHeader';
import { ThemeProvider } from './components/ThemeProvider/ThemeProvider';

export const App = () => {
	return (
		<ThemeProvider
			defaultTheme="dark"
			storageKey="vite-ui-theme"
		>
			<div className="bg-background min-h-svh w-full px-6 py-2 antialiased md:px-12 md:py-4 lg:px-24 lg:py-6">
				<NavigationHeader />
			</div>
		</ThemeProvider>
	);
};
