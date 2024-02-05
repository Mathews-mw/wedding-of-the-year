import { ComponentProps } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
	base: [
		'rounded-lg px-4 py-2 text-sm font-semibold shadow-sm outline-none',
		'focus-visible:rig-offset-2 focus-visible:ring-2 focus-visible:ring-rose-300',
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
	},

	defaultVariants: {
		variant: 'primary',
	},
});

export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>;

export function Button({ variant, className, ...props }: ButtonProps) {
	return <button className={button({ variant, className })} {...props} />;
}
