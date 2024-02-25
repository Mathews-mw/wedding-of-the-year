import { Metadata } from 'next';
import { HeroSection } from './hero-section';
import { ConfirmationForm } from './confirmation-form';

export const metadata: Metadata = {
	title: 'N | R - Confirmação',
};

export default function Presenca() {
	return (
		<div className="mt-8">
			<HeroSection />

			<ConfirmationForm />
		</div>
	);
}
