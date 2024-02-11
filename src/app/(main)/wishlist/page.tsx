'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Gift as GiftPrisma } from '@prisma/client';

import { api } from '@/lib/axios';
import { GiftList } from './GiftList';
import { useStore } from '@/zustand-store';
import { InfoCallout } from './InfoCallout';
import { Button } from '@/components/Buttons';
import { Select } from '@/components/Form/Select';
import { GiftListLoading } from './GiftListLoading';
import { WishlistModal } from './modals/WishlistModal';
import { EmptyWishlistModal } from './modals/EmptyWishlistModal';
import { SelectItem } from '@/components/Form/Select/SelectItem';

import { Scroll, ScrollText } from 'lucide-react';
import WishlistIllustration from '../../../../public/wishlist.png';

export default function WishList() {
	const [sortListValue, setSortListValue] = useState('asc');

	const { wishlist } = useStore((store) => {
		return {
			wishlist: store.wishlist,
		};
	});

	const { data: gifts, isFetching } = useQuery<GiftPrisma[]>({
		queryKey: ['gifts', sortListValue],
		queryFn: async () => {
			const { data } = await api.get('/gifts', {
				params: {
					sort: sortListValue,
				},
			});

			return data;
		},
	});

	return (
		<div className="mt-8">
			<div className="lg:grid lg:grid-cols-2 lg:gap-8 hiddenOnPhone:space-y-4">
				<div>
					<motion.div
						animate={{ opacity: 1, x: 0 }}
						initial={{ opacity: 0, x: -100 }}
						transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
					>
						<h3 className="text-2xl font-semibold hiddenOnPhone:px-2">Lista de desejos</h3>

						<p className="mt-4 text-justify hiddenOnPhone:px-2">
							Dê uma olhadinha em nossa lista de presentes e monte sua lista de desejos. Quando
							a lista de presentes for aberta para compras, você será notificado e poderá
							adquirir o item que marcou como interesse.
						</p>
					</motion.div>
				</div>

				<motion.div
					animate={{ opacity: 1, x: 0 }}
					initial={{ opacity: 0, x: 100 }}
					transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
				>
					<Image
						src={WishlistIllustration}
						quality={100}
						alt=""
						className="h-72 object-cover lg:h-96 lg:rounded-lg"
					/>
				</motion.div>
			</div>

			<div className="mt-8 space-y-4">
				<InfoCallout
					message="Você pode escolher até 3 dos presentes para marcar como seus interesses e colocá-los em
				sua lista de desejo."
				/>

				<InfoCallout message="Ao finalizar sua lista de desejos, será necessário que informe o seu nome e e-mail para que a lista seja de fato cadastrada." />
			</div>

			<div className="mt-8 space-y-4 hiddenOnPhone:px-2">
				<div className="w-full lg:flex lg:justify-between hiddenOnPhone:space-y-4">
					{wishlist.length <= 0 ? (
						<EmptyWishlistModal
							trigger={
								<Button className="flex items-center gap-4">
									<Scroll className="h-5 w-5" />
									Lista vazia
								</Button>
							}
						/>
					) : (
						<WishlistModal
							gifts={wishlist}
							trigger={
								<Button className="flex items-center gap-4">
									<ScrollText className="h-5 w-5" />
									{wishlist.length === 1
										? `Ver lista (1 presente)`
										: `Ver lista (${wishlist.length} presentes)`}
								</Button>
							}
						/>
					)}

					<div className="lg:flex lg:gap-4">
						<label htmlFor="list-order" className="text-nowrap font-semibold">
							Ordenar a lista
						</label>
						<Select
							placeholder="Selecione um valor"
							defaultValue="asc"
							value={sortListValue}
							onValueChange={(value) => setSortListValue(value)}
						>
							<SelectItem value="asc" text="A-Z" />
							<SelectItem value="desc" text="Z-A" />
							<SelectItem value="lowest" text="Menor preço" />
							<SelectItem value="biggest" text="Maior preço" />
						</Select>
					</div>
				</div>

				{isFetching || !gifts ? <GiftListLoading /> : <GiftList gifts={gifts} />}
			</div>
		</div>
	);
}
