import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

export function useUserRole() {
	const { getToken } = useAuth();
	const [role, setRole] = useState<'ADMIN' | 'USER' | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchRole() {
			try {
				const token = await getToken();
				const res = await fetch('http://localhost:3000/users/me', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (!res.ok) throw new Error('Unauthorized');

				const user = await res.json();
				setRole(user.role);
			} catch (e) {
				console.error(e);
				setRole(null);
			} finally {
				setLoading(false);
			}
		}

		fetchRole();
	}, [getToken]);

	return { role, loading };
}
