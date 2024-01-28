import { giftList } from '@/data/gift-list';
import Image from 'next/image';

interface IGiftPageProps {
	params: {
		id: string;
	};
}

export default function GiftListPage({ params }: IGiftPageProps) {
	const gift = giftList.find((item) => item.id === params.id);

	if (!gift) {
		return;
	}

	return (
		<div>
			<h3>Carrinho de compras</h3>

			<span>Detalhes do presente</span>

			<div className="h-px w-full  bg-slate-300" />

			<div>
				<Image src={gift.image} alt="" width={280} height={280} />
			</div>
		</div>
	);
}
