export function isValidPhone(phone: string) {
	const phoneRegex = /^\+7-(\d{3})-\d{3}-\d{2}-\d{2}$/;
	if (!phoneRegex.test(phone)) {
		throw new Error(
			'Неверный формат номера телефона. Ожидается: +7-XXX-XXX-XX-XX',
		);
	}
}
