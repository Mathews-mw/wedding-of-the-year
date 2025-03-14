import { ComponentProps } from 'react';

export type LogoProps = ComponentProps<'div'>;

export function Logo({ ...props }: LogoProps) {
	return (
		<div {...props}>
			<span className="text-lg font-bold text-rose-300 lg:text-2xl">Casamento F & L</span>
		</div>
	);
}
