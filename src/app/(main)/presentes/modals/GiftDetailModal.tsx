import Image from 'next/image';
import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';

import { IGift } from '@/data/gift-list';
import { useStore } from '@/zustand-store';
import { Button } from '@/components/Buttons';

import { X } from 'lucide-react';

interface IModalProps {
	trigger: ReactNode;
	gift: IGift;
}

export function GiftDetailModal({ trigger, gift }: IModalProps) {
	const { addToOrder } = useStore((store) => {
		return {
			addToOrder: store.addToOrder,
		};
	});

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-40 bg-zinc-900/50 data-[state=open]:animate-overlayShow" />
				<Dialog.Content
					className={twMerge([
						'fixed left-[50%] top-[50%] z-50 max-h-[85vh] max-w-[560px] translate-x-[-50%] translate-y-[-50%]',
						'overflow-y-auto rounded-[6px] bg-white p-[25px] shadow-sm',
						'focus:outline-none data-[state=open]:animate-contentShow',
					])}
				>
					<Dialog.Title className="mb-2 text-xl font-semibold text-slate-500">
						{gift.title}
					</Dialog.Title>

					<div className="flex flex-col items-center space-y-4 text-slate-600 ">
						<Image
							src={gift.image}
							alt=""
							quality={100}
							width={320}
							height={320}
							className="max-h-80 max-w-80 rounded-lg object-cover lg:max-h-[480px]"
						/>

						<p className="text-justify">{gift.description}</p>
					</div>

					<div className="mt-[25px] flex w-full flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between">
						<div className="flex w-full items-start gap-2 text-slate-500 hiddenOnPhone:justify-center">
							<span>Valor do presente: </span>
							<strong>
								{gift.price.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</strong>
						</div>

						<Dialog.Close asChild className="flex-grow whitespace-nowrap">
							<Button onClick={() => addToOrder(gift)}>Adicionar ao carrinho</Button>
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
