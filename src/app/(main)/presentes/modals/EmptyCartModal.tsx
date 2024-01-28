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
import EmptyCart from '../../../../../public/empty-cart.png';

interface IModalProps {
	trigger: ReactNode;
}

export function EmptyCartModal({ trigger }: IModalProps) {
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-40 bg-zinc-900/50 data-[state=open]:animate-overlayShow" />
				<Dialog.Content
					className={twMerge([
						'fixed left-[50%] top-[50%] z-50 max-h-[85vh] max-w-[40vw] translate-x-[-50%] translate-y-[-50%]',
						'overflow-y-auto rounded-[6px] bg-white p-[25px] shadow-sm',
						'focus:outline-none data-[state=open]:animate-contentShow',
					])}
				>
					<Dialog.Title className="mb-2 mt-4 text-xl font-semibold text-slate-600">
						Meu carrinho de presentes
					</Dialog.Title>

					<div>
						<Image
							src={EmptyCart}
							quality={100}
							alt="Empty Cart"
							className="h-60 w-60 object-cover"
						/>

						<div className="flex flex-col items-center text-slate-600">
							<span>Parece meio vazio por aqui...</span>
							<span>Que tal adicionar algum presente?</span>
						</div>
					</div>

					<div className="mt-[25px] flex w-full items-center justify-center">
						<Dialog.Close asChild className="">
							<Button variant="slate">Adicionar mais itens</Button>
						</Dialog.Close>
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
