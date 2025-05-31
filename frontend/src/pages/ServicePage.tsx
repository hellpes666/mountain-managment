import { Hero } from '@/components/MainPageContent';
import { ServiceCards } from '@/components/ServicePageContent';

export const ServicePage = () => {
	const user = { firstName: 'test' };
	return (
		<>
			<Hero
				title={
					<>
						{'Приветствуем вас'}
						<b className="inline">{user ? `, ${user.firstName}` : ''}</b>
						{'!'}
					</>
				}
				subtitle="Выберите из карточек ниже, куда хотите попасть"
				link={false}
			/>
			<ServiceCards />
		</>
	);
};
