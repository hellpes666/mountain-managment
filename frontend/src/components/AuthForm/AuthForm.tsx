import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '../ui/button';
import { FormWrapper } from '../shared/FormWrapper';
import { FormTitle } from './ui/FormTitle';
import { FullNameFields } from './ui/FullNameFields';
import { InputField } from './ui/InputField';
import { OppositeAction } from './ui/OppositeAction';
import type { RegisterData } from '@/types/auth';
import { Spinner } from '@/shared/ui/Spinner';

interface IAuthFormProps {
	title: string;
	subtitle: string;
	isRegister: boolean;
}

export const AuthForm: React.FC<IAuthFormProps> = ({ title, subtitle, isRegister }) => {
	const { register, login, isLoading } = useAuthStore();
	async function submitForm(formData: FormData) {
		const data = {
			email: formData.get('email') as string,
			password: formData.get('password') as string,
			...(isRegister && {
				firstName: formData.get('firstName') as string | null,
				lastName: formData.get('lastName') as string | null,
			}),
		};

		if (isRegister) {
			await register(data as RegisterData);
		} else {
			await login(data);
		}
	}

	return (
		<FormWrapper>
			<form
				className="space-y-4"
				action={submitForm}
			>
				<FormTitle
					title={title}
					subtitle={subtitle}
				/>
				{isRegister && <FullNameFields />}

				<InputField
					htmlFor="email"
					labelName="Email"
					id="email"
					type="email"
					placeholder="Введите ваш email"
					required
				/>

				<InputField
					htmlFor="password"
					labelName="Пароль"
					id="password"
					type="password"
					placeholder="Введите ваш пароль"
					required
				/>

				<Button
					className="mt-2 w-full"
					type="submit"
					variant="secondary"
					disabled={isLoading}
				>
					{isLoading ? <Spinner /> : isRegister ? `Зарегистрироваться` : `Войти`}
				</Button>
			</form>

			<div className="flex flex-1 flex-col justify-end">
				{isRegister ? (
					<OppositeAction
						title="Уже есть аккаунт?"
						link="/login"
						linkName="Войти"
					/>
				) : (
					<OppositeAction
						title="Нет аккаунта?"
						link="/register"
						linkName="Зарегистрироваться"
					/>
				)}
			</div>
		</FormWrapper>
	);
};
