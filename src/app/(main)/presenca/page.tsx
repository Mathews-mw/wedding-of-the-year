import { Metadata } from 'next';
import { HeroSection } from './hero-section';
import { ConfirmationForm } from './confirmation-form';

export const metadata: Metadata = {
	title: 'F & L | Confirmação de presença',
};

export default function Presenca() {
	return (
		<div className="mt-20 mb-8 lg:mt-8 lg:mb-0">
			<HeroSection />

			<div className="px-4 lg:px-0">
				<ConfirmationForm />
			</div>
		</div>
	);
}
