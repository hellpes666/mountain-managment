import { Hero } from '@/components/MainPageContent';
import { ServiceCards } from '@/components/ServicePageContent';
import { useAuthStore } from '@/store/useAuthStore';

export const ServicePage = () => {
    const { firstName } = useAuthStore();
    
	return (
		<>
			<Hero
				title={
					<>
						{'Приветствуем вас'}
						<b className="inline">{firstName ? `, ${firstName}` : ''}</b>
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
