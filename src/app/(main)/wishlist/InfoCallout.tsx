import { Info } from 'lucide-react';
import { ReactNode } from 'react';

interface IInfoCalloutProps {
	message: string;
}

export function InfoCallout({ message }: IInfoCalloutProps) {
	return (
		<div className="flex items-start gap-2 rounded-lg border-l-4 border-rose-400 bg-rose-100 p-4 lg:items-center">
			<Info className="h-5 w-5 text-rose-400 hiddenOnPhone:text-sm" />
			<p>{message}</p>
		</div>
	);
}
