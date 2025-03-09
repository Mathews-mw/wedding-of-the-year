import Image from 'next/image';
import { Suspense } from 'react';

import { LetterCard } from './letter-card';

import PartyPopper from '@/../public/party-popper.png';

export default function ConfirmationPage() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center space-y-10 pt-20">
			<div className="flex w-full flex-col items-center justify-center gap-2">
				<Image src={PartyPopper} alt="" className="h-20 w-20" />
				<span className="text-lg font-semibold">Sua presença foi confirmada com sucesso!</span>
			</div>

			<Suspense fallback={<div>Carregando...</div>}>
				<LetterCard />
			</Suspense>
		</div>
	);
}
