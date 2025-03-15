'use client';

import { twMerge } from 'tailwind-merge';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

interface INavItemProps extends LinkProps {
	title: string;
	href: string;
	onSelectItem: () => void;
}

export function NavItem({ title, href, onSelectItem, ...rest }: INavItemProps) {
	const pathname = usePathname();

	let isActive = false;

	if (pathname === href || pathname === rest.as) {
		isActive = true;
	}

	return (
		<Link
			href={href}
			data-state={isActive}
			onClick={onSelectItem}
			className={twMerge([
				'text-muted-foreground flex items-start gap-4 rounded-md p-2 text-sm',
				'hover:bg-muted hover:text-primary',
				'data-[state=true]:bg-primary/10 data-[state=true]:text-primary data-[state=true]:font-bold',
			])}
			{...rest}
		>
			<div className="flex w-full items-center justify-between">
				<span>{title}</span>
			</div>
		</Link>
	);
}
