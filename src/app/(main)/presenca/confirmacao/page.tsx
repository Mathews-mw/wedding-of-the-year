'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { Caveat } from 'next/font/google';
import { useSearchParams } from 'next/navigation';

import PartyPopper from '../../../../../public/party-popper.png';

const caveat = Caveat({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

export default function ConfirmationPage() {
	const searchParams = useSearchParams();

	const guestName = searchParams.get('guest');

	return (
		<div className="flex h-full w-full flex-col items-center justify-center space-y-10 pt-20">
			<div className="flex w-full flex-col items-center justify-center gap-2">
				<Image src={PartyPopper} alt="" className="h-20 w-20" />
				<span className="text-lg font-medium">Sua presença foi confirmada com sucesso :)</span>
			</div>

			<div
				className={twMerge([
					'font rounded-lg bg-rose-50 px-4 py-8 text-2xl font-light ',
					caveat.className,
				])}
			>
				<p className="indent-10">{guestName}, </p>
				<br />

				<p className="indent-10">
					Gostaríamos de expressar nossa sincera gratidão por ter aceitado o nosso convite para
					participar conosco do dia mais especial de nossas vidas. Sua presença e calorosa
					participação tornará o nosso casamento ainda mais significativo e inesquecível.
				</p>
				<br />

				<p className="indent-10">Com toda nossa gratidão, Naíla e Rodrigo.</p>
				<br />

				<p className="text-center text-xl">Nos vemos na cerimônia. Até breve!</p>
			</div>
		</div>
	);
}
