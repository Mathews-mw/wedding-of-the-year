/* eslint-disable @typescript-eslint/ban-ts-comment */
import { twMerge } from 'tailwind-merge';
import InputMask, { Props as PropsMask } from 'react-input-mask';
import { ComponentProps, ForwardRefRenderFunction, forwardRef } from 'react';

type InputPrefixProps = ComponentProps<'div'>;
type InputControlProps = PropsMask;
type InputRootProps = ComponentProps<'div'>;

export function InputMaskPrefix(props: InputPrefixProps) {
	return <div {...props} />;
}

const InputMaskControlBase: ForwardRefRenderFunction<HTMLInputElement, InputControlProps> = (
	{ ...props },
	ref
) => {
	return (
		<InputMask
			// @ts-ignore
			ref={ref}
			className="flex-1 border-0 bg-transparent p-0 text-slate-600 placeholder-slate-300 outline-none"
			{...props}
		/>
	);
};

export function InputMaskRoot(props: InputRootProps) {
	return (
		<div
			className={twMerge(
				'flex w-full items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 shadow-sm',
				'focus-within:border-rose-200 focus-within:ring-1 focus-within:ring-rose-100',
				props.className
			)}
			{...props}
		/>
	);
}

export const InputMaskControl = forwardRef(InputMaskControlBase);
