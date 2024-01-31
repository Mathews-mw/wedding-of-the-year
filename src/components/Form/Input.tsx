import { ComponentProps, ForwardRefRenderFunction, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type InputRootProps = ComponentProps<'div'>;
type InputControlProps = ComponentProps<'input'>;
type InputPrefixProps = ComponentProps<'div'>;

export function InputPrefix(props: InputPrefixProps) {
	return <div {...props} />;
}

const InputControlBase: ForwardRefRenderFunction<HTMLInputElement, InputControlProps> = (
	{ ...props },
	ref
) => {
	return (
		<input
			ref={ref}
			className="flex-1 border-0 bg-transparent p-0 text-slate-600 placeholder-slate-300 outline-none"
			{...props}
		/>
	);
};

export function InputRoot(props: InputRootProps) {
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

export const InputControl = forwardRef(InputControlBase);
