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

export function ShoppingCartModal({ trigger, gifts }: IModalProps) {
	const router = useRouter();

	const [parent] = useAutoAnimate();

	const { removeToOrder } = useStore((store) => {
		return {
			removeToOrder: store.removeToOrder,
		};
	});

	const totalGiftsValue = gifts.reduce((amount, value) => {
		return (amount += value.price);
	}, 0);

	const totalGiftsValueFormatted = totalGiftsValue.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-40 bg-zinc-900/50 data-[state=open]:animate-overlayShow" />
				<Dialog.Content
					className={twMerge([
						'fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-full max-w-[40vw] translate-x-[-50%] translate-y-[-50%]',
						'overflow-y-auto rounded-[6px] bg-white p-[25px] shadow-sm',
						'focus:outline-none data-[state=open]:animate-contentShow',
					])}
				>
					<Dialog.Title className="mb-2 text-xl font-semibold text-slate-600">
						Meu carrinho de presentes
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
										<div className="rounded-lg border border-slate-300 p-1 shadow-sm">
											<Image
												src={gift.image}
												alt=""
												width={80}
												height={80}
												quality={100}
												className="h-20 w-20 rounded-lg object-cover"
											/>
										</div>

										<div className="flex flex-col items-start gap-4">
											<span className="text-lg">{gift.title}</span>

											<button
												onClick={() => removeToOrder(gift)}
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

						<div className="grid grid-cols-3 pl-2 pt-4">
							<strong className="col-span-2">Total: </strong>
							<strong>{totalGiftsValueFormatted}</strong>
						</div>
					</div>

					<div className="mt-[25px] flex w-full items-center justify-end gap-4">
						<Dialog.Close asChild className="">
							<Button variant="slate">Adicionar mais itens</Button>
						</Dialog.Close>

						{gifts.length > 0 && (
							<Dialog.Close asChild className="">
								<Button onClick={() => router.push('/pedido')}>Finalizar comprar</Button>
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
