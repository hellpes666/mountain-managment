import { RedirectToSignIn, useUser } from '@clerk/clerk-react';
import type { ReactNode } from 'react';
import { Loader } from 'lucide-react';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { isSignedIn, isLoaded } = useUser();

	if (!isLoaded) {
		return <Loader />;
	}

	if (!isSignedIn) {
		return <RedirectToSignIn />;
	}

	return <>{children}</>;
};
