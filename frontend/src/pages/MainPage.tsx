import { Hero, ServicesOpportunity } from '@/components/MainPageContent';

export const MainPage = () => {
	return (
		<>
			<Hero
				title="Учёт для альпинистских клубов"
				subtitle="Лёгкий, быстрый и полноценный альпинистский учёт"
				link={true}
			/>
			<ServicesOpportunity />
		</>
	);
};
