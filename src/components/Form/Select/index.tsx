'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import * as SelectRadix from '@radix-ui/react-select';

import { ChevronDown } from 'lucide-react';

export interface SelectProps extends SelectRadix.SelectProps {
	children: ReactNode;
	placeholder: string;
}

export function Select({ children, placeholder, ...props }: SelectProps) {
	return (
		<SelectRadix.Root {...props}>
			<SelectRadix.Trigger
				className={twMerge([
					'flex h-11 w-full items-center justify-between gap-2 rounded-lg px-3 py-2',
					'border border-zinc-300 shadow-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100',
					'data-[placeholder]:text-slate-300',
				])}
			>
				<SelectRadix.Value placeholder={placeholder} className="text-black" />
				<SelectRadix.Icon>
					<ChevronDown className="h-5 w-5 text-slate-500" />
				</SelectRadix.Icon>
			</SelectRadix.Trigger>

			<SelectRadix.Portal>
				<SelectRadix.Content
					side="bottom"
					position="popper"
					sideOffset={8}
					className={twMerge([
						'overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm',
						'animate-slideDownAndFade z-10 w-[--radix-select-trigger-width]',
					])}
				>
					<SelectRadix.Viewport>{children}</SelectRadix.Viewport>
				</SelectRadix.Content>
			</SelectRadix.Portal>
		</SelectRadix.Root>
	);
}
