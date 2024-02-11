'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { CheckSquare, Gift, Info } from 'lucide-react';

interface IPageProps {
	params: {
		id: string;
	};
}

export default function WishlistGuestConfirmationPage({ params }: IPageProps) {
	const searchParams = useSearchParams();

	const wishlistId = params.id;
	const guestName = searchParams.get('guest');

	return (
		<div className="mt-8 space-y-8 hiddenOnPhone:px-4">
			<h3 className="text-2xl font-semibold">Confirmação cadastro lista de desejos</h3>

			<div className="flex items-center gap-2">
				<Image src="/wishlist-thanks.png" alt="wishlist" width={32} height={32} />
				<span className="font-semibold">
					{guestName}, sua lista de desejos foi registrada 🎉🎉
				</span>
			</div>

			<div className="flex items-start gap-2 rounded-lg border-l-4 border-rose-400 bg-rose-100 p-4 lg:items-center">
				<Info className="h-5 w-5 text-rose-400 hiddenOnPhone:text-sm" />
				<p>
					Identificador da sua lista de desejos: <strong>{wishlistId}</strong>
				</p>
			</div>

			<div className="flex flex-col gap-2 rounded-lg bg-rose-100 p-4">
				<p>
					É importante que você <strong>salve o identificador único</strong> da sua lista de
					desejos. Quando a lista de presentes estiver aberta para compras, você terá que
					informar o identificador da sua lista de desejos para ter acesso a ela e poder comprar
					os itens nela colocados.Além disso, você pode usar esse identificador para ter acesso
					a sua lista de desejos a qualquer momento para visualizá-la ou editá-la.
				</p>

				<p>Assim que os presentes estiverem disponíveis para compra, você será informado.</p>

				<p className="mt-4 text-center">Gratidão! 😄</p>
			</div>
		</div>
	);
}
