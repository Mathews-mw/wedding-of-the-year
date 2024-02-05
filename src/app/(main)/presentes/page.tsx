'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Gift as GiftPrisma } from '@prisma/client';

import { api } from '@/lib/axios';
import { GiftList } from './GiftList';
import { useStore } from '@/zustand-store';
import { Button } from '@/components/Buttons';
import { Select } from '@/components/Form/Select';
import { EmptyCartModal } from './modals/EmptyCartModal';
import { ShoppingCartModal } from './modals/ShoppingCartModal';
import { SelectItem } from '@/components/Form/Select/SelectItem';

import { ShoppingCart } from 'lucide-react';
import { GiftListLoading } from './GiftListLoading';
import WeddingGifts from '../../../../public/wedding-gifts.png';

export default function PresentesPage() {
	const [sortListValue, setSortListValue] = useState('asc');

	const { order } = useStore((store) => {
		return {
			order: store.order,
			addToOrder: store.addToOrder,
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
			<div className="grid grid-cols-2 gap-8">
				<div>
					<motion.div
						animate={{ opacity: 1, x: 0 }}
						initial={{ opacity: 0, x: -100 }}
						transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
					>
						<h3 className="text-2xl font-semibold">Lista de presentes</h3>

						<p className="mt-4 text-justify">
							Dê uma olhadinha em nossa lista de presentes. Ficaremos muito felizes com sua
							contribuição.
						</p>
					</motion.div>
				</div>

				<motion.div
					animate={{ opacity: 1, x: 0 }}
					initial={{ opacity: 0, x: 100 }}
					transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
				>
					<Image
						src={WeddingGifts}
						quality={100}
						alt=""
						className="h-96 rounded-lg object-cover"
					/>
				</motion.div>
			</div>

			<div className="mt-8 space-y-4">
				<div className="flex w-full justify-between">
					{order.length <= 0 ? (
						<EmptyCartModal
							trigger={
								<Button className="flex items-center gap-4">
									<ShoppingCart className="h-5 w-5" />
									Carrinho vazio
								</Button>
							}
						/>
					) : (
						<ShoppingCartModal
							gifts={order}
							trigger={
								<Button className="flex items-center gap-4">
									<ShoppingCart className="h-5 w-5" />
									{order.length === 1
										? `Ver carrinho (1 presente)`
										: `Ver carrinho (${order.length} presentes)`}
								</Button>
							}
						/>
					)}

					<div className="flex gap-4">
						<label htmlFor="list-order" className="text-nowrap text-lg font-semibold">
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
