import { AuthForm } from '@/components/AuthForm';

export const RegisterPage = () => {
    return (
        
		<AuthForm
			title={'Создать аккаунт'}
			subtitle={'Заполните форму ниже, чтобы начать'}
			isRegister={true}
		/>
	);
};
