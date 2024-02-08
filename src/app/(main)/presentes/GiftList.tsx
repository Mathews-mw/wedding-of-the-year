'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Gift as GiftPrisma } from '@prisma/client';

import { useStore } from '@/zustand-store';
import { Button } from '@/components/Buttons';
import { GiftDetailModal } from './modals/GiftDetailModal';

import { Gift, ShoppingBag } from 'lucide-react';
import { HandHeart } from '@phosphor-icons/react';

interface IGiftListProps {
	gifts: GiftPrisma[];
}

export function GiftList({ gifts }: IGiftListProps) {
	const { order } = useStore((store) => {
		return {
			order: store.order,
			addToOrder: store.addToOrder,
		};
	});

	return (
		<div className="grid grid-cols-giftListTemplateColumns grid-rows-giftListTemplateRows gap-4">
			{gifts?.map((gift) => {
				return (
					<motion.div
						key={gift.id}
						whileHover={{ scale: 1.03 }}
						transition={{ type: 'spring', stiffness: 400, damping: 10 }}
						className={twMerge([
							'flex flex-col items-center justify-center space-y-2 rounded-lg border border-slate-200 px-4 pb-4 pt-1 shadow-sm',
							`${gift.available ? 'opacity-100' : 'opacity-50'}`,
						])}
					>
						{gift.amount > 0 && (
							<div className="flex w-full justify-end">
								<span className="text-[10px] font-bold">{gift.amount} UN</span>
							</div>
						)}

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
								<span>Esgotado</span>
							</div>
						)}
					</motion.div>
				);
			})}
		</div>
	);
}
