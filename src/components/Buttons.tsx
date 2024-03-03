import { ComponentProps } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
	base: [
		'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
		'active:scale-[1.01] active:opacity-80',
		'disabled:opacity-50',
	],

	variants: {
		variant: {
			primary: 'bg-rose-500 text-white enabled:hover:bg-rose-500/90',
			slate: 'bg-slate-500 text-white hover:bg-slate-500/90',
			outline: 'border border-zinc-300 text-zinc-700 hover:bg-zinc-50',
			ghost: 'rounded-md px-2 text-slate-500 shadow-none hover:bg-slate-50',
		},
		size: {
			default: 'h-10 px-4 py-2',
			xs: 'h-8 px-2.5',
			sm: 'h-9 rounded-md px-3',
			lg: 'h-11 rounded-md px-8',
			icon: 'h-10 w-10',
		},
	},

	defaultVariants: {
		variant: 'primary',
		size: 'default',
	},
});

export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>;

export function Button({ variant, className, ...props }: ButtonProps) {
	return <button className={button({ variant, className })} {...props} />;
}
