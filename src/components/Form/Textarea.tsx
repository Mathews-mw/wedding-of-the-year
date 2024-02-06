import { ComponentProps, ForwardRefRenderFunction, forwardRef } from 'react';

export type TextAreaProps = ComponentProps<'textarea'>;

const TextareaBase: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = (
	{ ...props },
	ref
) => {
	return (
		<textarea
			ref={ref}
			className="min-h-[120px] w-full resize-y rounded-lg border border-slate-300 px-3 py-2 shadow-sm outline-none focus:border-rose-200 focus:ring-1 focus:ring-rose-100"
			{...props}
		/>
	);
};

export const Textarea = forwardRef(TextareaBase);
