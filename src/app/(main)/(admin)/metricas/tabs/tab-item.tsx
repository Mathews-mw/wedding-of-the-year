import { ReactNode } from 'react';
import { TabsTrigger } from '@/components/ui/tabs';

interface ITabItemProps {
	value: string;
	title: string;
	children: ReactNode;
}

export function TabItem({ value, title, children }: ITabItemProps) {
	return (
		<TabsTrigger value={value} className="group space-x-2">
			{children}
			<span className="group-data-[state=active]:font-bold">{title}</span>
		</TabsTrigger>
	);
}
