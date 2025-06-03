import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/useAuthStore';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
	const { firstName, lastName, email, createdAt, isAuthorized, logout } = useAuthStore();

	const navigate = useNavigate();

	useLayoutEffect(() => {
		if (!isAuthorized) {
			navigate('/');
		}
	}, [isAuthorized, navigate]);

	return (
		<div className="mx-auto w-full max-w-3xl space-y-8 p-6">
			<h1 className="text-2xl font-semibold">Профиль</h1>

			<div className="grid gap-6 sm:grid-cols-2">
				<div className="flex flex-col space-y-2">
					<Label htmlFor="firstName">Имя</Label>
					<Input
						disabled={true}
						id="firstName"
						defaultValue={firstName as string}
					/>
				</div>

				<div className="flex flex-col space-y-2">
					<Label htmlFor="lastName">Фамилия</Label>
					<Input
						disabled={true}
						id="lastName"
						defaultValue={lastName as string}
					/>
				</div>

				<div className="flex flex-col space-y-2 sm:col-span-2">
					<Label htmlFor="email">Email</Label>
					<Input
						disabled={true}
						id="email"
						type="email"
						defaultValue={email as string}
					/>
				</div>

				<div className="sm:col-span-2">
					<p className="text-muted-foreground text-sm">Аккаунт создан: {createdAt?.toLocaleDateString()}</p>
				</div>
				<Button
					className="max-w-[150px] cursor-pointer"
					onClick={logout}
				>
					Выйти
				</Button>
			</div>
		</div>
	);
};
