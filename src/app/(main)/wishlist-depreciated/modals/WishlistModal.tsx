'use client';

import Image from 'next/image';
import React, { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import * as Dialog from '@radix-ui/react-dialog';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { IGift } from '@/data/gift-list';
import { useStore } from '@/zustand-store';
import { Button } from '@/components/Buttons';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface IModalProps {
	trigger: ReactNode;
	gifts: IGift[];
}

export function WishlistModal({ trigger, gifts }: IModalProps) {
	const router = useRouter();

	const [parent] = useAutoAnimate();

	const { MAXIMUM_WISHLIST_SIZE, wishlist, removeToWishlist } = useStore((store) => {
		return {
			MAXIMUM_WISHLIST_SIZE: store.MAXIMUM_WISHLIST_SIZE,
			wishlist: store.wishlist,
			removeToWishlist: store.removeToWishlist,
		};
	});

	const isListFull = wishlist.length === MAXIMUM_WISHLIST_SIZE;

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-40 bg-zinc-900/50 data-[state=open]:animate-overlayShow" />
				<Dialog.Content
					className={twMerge([
						'fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-full max-w-[90vw] translate-x-[-50%] translate-y-[-50%] lg:max-w-[40vw]',
						'overflow-y-auto rounded-[6px] bg-white p-[25px] shadow-sm',
						'focus:outline-none data-[state=open]:animate-contentShow',
					])}
				>
					<Dialog.Title className="mb-2 text-xl font-semibold text-slate-600">
						Minha lista de desejos
					</Dialog.Title>

					<div
						ref={parent}
						className="flex flex-col space-y-4 divide-y divide-slate-200 text-slate-600"
					>
						<div className="grid grid-cols-3">
							<span className="col-span-2">Descrição do presente</span>
							<span>Valor</span>
						</div>

						{gifts.map((gift) => {
							return (
								<div key={gift.id} className="grid grid-cols-3 pt-4">
									<div className="col-span-2 flex gap-4">
										<div className="h-16 w-16 overflow-hidden rounded-lg shadow-sm lg:h-20 lg:w-20">
											<Image
												src={gift.image}
												alt=""
												width={80}
												height={80}
												quality={100}
												className="h-full w-full rounded-lg object-cover"
											/>
										</div>

										<div className="flex flex-col items-start gap-4">
											<span className="text-wrap text-lg">{gift.title}</span>

											<button
												onClick={() => removeToWishlist(gift)}
												className="text-sm font-semibold text-rose-400 hover:text-rose-500 active:scale-[1.05] active:opacity-80"
											>
												Remover
											</button>
										</div>
									</div>

									<span>
										{gift.price.toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'BRL',
										})}
									</span>
								</div>
							);
						})}
					</div>

					<div className="mt-[25px] flex w-full flex-col items-center gap-4 lg:flex-row lg:justify-end">
						{!isListFull && (
							<Dialog.Close asChild className="hiddenOnPhone:w-full">
								<Button variant="slate">Adicionar mais itens</Button>
							</Dialog.Close>
						)}

						{gifts.length > 0 && (
							<Dialog.Close asChild className="hiddenOnPhone:w-full">
								<Button onClick={() => router.push('/wishlist/confirmacao')}>
									Confirmar lista
								</Button>
							</Dialog.Close>
						)}
					</div>

					<Dialog.Close asChild>
						<button
							className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-slate-600 focus:shadow-[0_0_0_2px] focus:shadow-slate-500 focus:outline-none"
							aria-label="Close"
						>
							<X />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
