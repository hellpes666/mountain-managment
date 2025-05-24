import { Hero } from '@/components/MainPageContent';
import { ServiceCards } from '@/components/ServiceCards';
import { useUser } from '@clerk/clerk-react';
import React from 'react';

export const ServicePage = () => {
	const { user } = useUser();

	return (
		<div className="flex w-full flex-col items-center justify-center gap-5">
			<Hero
				title={
					<>
						{'Приветствуем вас'}
						<b className="inline">{user ? `, ${user.firstName}` : ''}</b>
						{'!'}
					</>
				}
				subtitle="Выберите из карточек ниже куда хотите попасть"
				link={false}
			/>
			<ServiceCards />
		</div>
	);
};
