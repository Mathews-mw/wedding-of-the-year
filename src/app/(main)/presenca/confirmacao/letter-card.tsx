'use client';

import { twMerge } from 'tailwind-merge';
import { Caveat } from 'next/font/google';
import { useSearchParams } from 'next/navigation';

const caveat = Caveat({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

export function LetterCard() {
	const searchParams = useSearchParams();

	const guestName = searchParams.get('guest');

	return (
		<div className={twMerge(['font bg-main/30 rounded-[8px] px-4 py-8 text-2xl font-light', caveat.className])}>
			<p className="indent-10">{guestName}, </p>
			<br />

			<p className="indent-10">
				Gostaríamos de expressar nossa sincera gratidão por ter aceitado o convite para participar conosco do dia mais
				especial de nossas vidas. Sua presença e calorosa participação tornará o nosso casamento ainda mais
				significativo e inesquecível.
			</p>
			<br />

			<p className="indent-10">Com toda nossa gratidão, Laura e Fábio.</p>
			<br />

			<p className="text-center text-xl">Nos vemos na cerimônia. Até breve!</p>
		</div>
	);
}
