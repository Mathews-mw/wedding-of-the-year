import { twMerge } from 'tailwind-merge';

export function Spinner() {
	return (
		<div className="relative h-6 w-6">
			<span
				className={twMerge([
					'absolute left-0 top-0 box-border block h-6 w-6',
					'rounded-full border-4 border-t-4 border-slate-100/70 border-t-rose-500',
					'animate-spin',
				])}
			></span>
		</div>
	);
}
