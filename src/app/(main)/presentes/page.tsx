'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

import { useStore } from '@/zustand-store';
import { giftList } from '@/data/gift-list';
import { Button } from '@/components/Buttons';
import { Select } from '@/components/Form/Select';
import { EmptyCartModal } from './modals/EmptyCartModal';
import { GiftDetailModal } from './modals/GiftDetailModal';
import { ShoppingCartModal } from './modals/ShoppingCartModal';
import { SelectItem } from '@/components/Form/Select/SelectItem';

import { HandHeart } from '@phosphor-icons/react';
import { Gift, ShoppingBag, ShoppingCart } from 'lucide-react';
import WeddingGifts from '../../../../public/wedding-gifts.png';

export default function PresentesPage() {
	const { order } = useStore((store) => {
		return {
			order: store.order,
			addToOrder: store.addToOrder,
		};
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
						<Select placeholder="Selecione um valor" defaultValue="asc">
							<SelectItem value="asc" text="A-Z" />
							<SelectItem value="desc" text="Z-A" />
							<SelectItem value="lowest" text="Menor preço" />
							<SelectItem value="biggest" text="Maior preço" />
						</Select>
					</div>
				</div>

				<div className="grid grid-cols-giftListTemplateColumns grid-rows-giftListTemplateRows gap-4">
					{giftList.map((gift) => {
						return (
							<motion.div
								key={gift.id}
								whileHover={{ scale: 1.03 }}
								transition={{ type: 'spring', stiffness: 400, damping: 10 }}
								className={twMerge([
									'flex flex-col items-center justify-center space-y-2 rounded-lg border border-slate-200 p-4 shadow-sm',
									`${gift.available ? 'opacity-100' : 'opacity-50'}`,
								])}
							>
								<Image
									src={gift.image}
									quality={100}
									alt={gift.title}
									width={320}
									height={320}
									className="h-[208px] w-[208px] rounded-lg object-cover"
								/>

								<span className="text-center text-sm">{gift.title}</span>

								<span className="font-semibold text-slate-600">
									{gift.price.toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									})}
								</span>

								{order.find((item) => item.id === gift.id) ? (
									<div className="flex items-center justify-center gap-2 text-rose-400">
										<ShoppingBag className="h-5 w-5" />
										<span>No carrinho</span>
									</div>
								) : gift.available ? (
									<GiftDetailModal
										gift={gift}
										trigger={
											<Button className="flex items-center justify-center gap-2">
												<Gift className="h-5 w-5" />
												Presentear
											</Button>
										}
									/>
								) : (
									<div className="flex items-center justify-center gap-2 text-rose-400">
										<HandHeart className="h-5 w-5" />
										<span>Comprado</span>
									</div>
								)}
							</motion.div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
