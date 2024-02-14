'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { Gift as GiftPrisma } from '@prisma/client';

import { useStore } from '@/zustand-store';
import { Button } from '@/components/Buttons';
import { GiftDetailModal } from './modals/GiftDetailModal';

import { Heart, ListChecks } from 'lucide-react';

interface IGiftListProps {
	gifts: GiftPrisma[];
}

export function GiftList({ gifts }: IGiftListProps) {
	const { MAXIMUM_WISHLIST_SIZE, wishlist } = useStore((store) => {
		return {
			MAXIMUM_WISHLIST_SIZE: store.MAXIMUM_WISHLIST_SIZE,
			wishlist: store.wishlist,
		};
	});

	const isListFull = wishlist.length === MAXIMUM_WISHLIST_SIZE;

	return (
		<div className="grid grid-cols-giftListTemplateColumns grid-rows-giftListTemplateRows gap-4">
			{gifts?.map((gift) => {
				return (
					<motion.div
						key={gift.id}
						whileHover={{ scale: 1.03 }}
						transition={{ type: 'spring', stiffness: 400, damping: 10 }}
						className={twMerge([
							'flex flex-col items-center justify-center space-y-2 rounded-lg border border-slate-200 p-2 shadow-sm',
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

						<span className="text-center text-sm font-semibold">{gift.title}</span>

						<span className="font-semibold text-slate-600">
							{gift.price.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
						</span>

						{wishlist.find((item) => item.id === gift.id) ? (
							<div className="flex items-center justify-center gap-2 text-rose-400">
								<ListChecks className="h-5 w-5" />
								<span>Na lista</span>
							</div>
						) : (
							<GiftDetailModal
								gift={gift}
								trigger={
									<Button
										className="flex items-center justify-center gap-2"
										disabled={isListFull}
									>
										<Heart className="h-5 w-5" />
										Adicionar
									</Button>
								}
							/>
						)}
					</motion.div>
				);
			})}
		</div>
	);
}
