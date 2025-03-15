import { Metadata } from 'next';
import { HeroSection } from './hero-section';
import { ProductList } from './product-list';

export const metadata: Metadata = {
	title: 'F & L | Lista de presentes',
};

export default function GiftsPage() {
	return (
		<div className="mt-20 mb-8 lg:mt-8 lg:mb-0">
			<HeroSection />

			<ProductList />
		</div>
	);
}
