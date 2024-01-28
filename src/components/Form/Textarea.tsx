import { ComponentProps } from 'react';

export type TextAreaProps = ComponentProps<'textarea'>;

export function Textarea(props: TextAreaProps) {
	return (
		<textarea
			className="min-h-[120px] w-full resize-y rounded-lg border border-slate-300 px-3 py-2 shadow-sm outline-none focus:border-rose-200 focus:ring-1 focus:ring-rose-100"
			{...props}
		/>
	);
}
