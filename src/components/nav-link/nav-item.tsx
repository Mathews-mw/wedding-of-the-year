'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

interface INavItemProps extends LinkProps {
	title: string;
	href: string;
	toggleDrawer?: () => void;
}

export function NavItem({ href, title, toggleDrawer, ...rest }: INavItemProps) {
	const pathname = usePathname();

	let isActive = false;

	if (pathname === href || pathname === rest.as) {
		isActive = true;
	}

	return (
		<Link
			href={href}
			data-state={isActive}
			onClick={toggleDrawer}
			className={twMerge([
				'flex items-start gap-4 rounded p-2 text-slate-500',
				'hover:text-rose-400',
				'data-[state=true]:font-medium data-[state=true]:text-rose-400',
			])}
			{...rest}
		>
			<span>{title}</span>
		</Link>
	);
}
