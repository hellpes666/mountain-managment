const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const fetchInstance = async (endpoint: string, options: RequestInit = {}) => {
	const token = localStorage.getItem('token');

	const headers = {
		'Content-Type': 'application/json',
		...(token ? { Authorization: `Bearer ${token}` } : {}),
		...options.headers,
	};

	const response = await fetch(`${BASE_URL}/${endpoint}`, {
		...options,
		headers,
	});

	if (!response.ok) {
		const errorBody = await response.text();
		throw new Error(`Error ${response.status}: ${errorBody}`);
	}

	// автоматический JSON парсинг, если есть тело
	const contentType = response.headers.get('content-type');
	if (contentType && contentType.includes('application/json')) {
		return response.json();
	}

	return response;
};
