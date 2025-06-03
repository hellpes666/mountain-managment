import { AuthForm } from '@/components/AuthForm';

export const LoginPage = () => {
	return (
		<AuthForm
			title={'Вход'}
			subtitle={'Введите свои данные для входа'}
			isRegister={false}
		/>
	);
};
