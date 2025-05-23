import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key');
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<ClerkProvider
				publishableKey={PUBLISHABLE_KEY}
				afterSignOutUrl="/service"
			>
				<App />
			</ClerkProvider>
		</BrowserRouter>
	</StrictMode>,
);
