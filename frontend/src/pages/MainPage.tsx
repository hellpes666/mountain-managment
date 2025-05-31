import { Hero, ServicesOpportunity } from '@/components/MainPageContent';
// import { Loader } from 'lucide-react';

export const MainPage = () => {
	// const { role, loading } = useUserRole();

	// if (loading) return <Loader />;
	// if (role !== 'ADMIN') return <p>Access denied</p>;

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
