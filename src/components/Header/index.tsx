'use client';

import { useState } from 'react';

import { Logo } from '../Logo';
import { Button } from '../Buttons';
import { Menu } from 'lucide-react';
import { NavLink } from '../NavLink';
import { NavDrawer } from '../NavDrawer';
import Image from 'next/image';

export function Header() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	return (
		<header className="sticky left-0 top-0 z-30 w-full bg-white/90 p-2 shadow-sm lg:p-4 hiddenOnPhone:px-4">
			<div className="flex max-w-[1440px] items-center justify-between lg:mx-auto lg:px-40">
				<div className="flex items-center gap-2">
					<Image src="/Logo.png" alt="Logo" width={32} height={32} />
					<Logo className="hiddenOnPhone:hidden" />
				</div>

				<Button
					variant="ghost"
					className="ml-auto lg:hidden"
					onClick={() => setIsDrawerOpen(!isDrawerOpen)}
				>
					<Menu />
				</Button>

				<NavDrawer
					isDrawerOpen={isDrawerOpen}
					toggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
				/>
				<NavLink />
			</div>
		</header>
	);
}
