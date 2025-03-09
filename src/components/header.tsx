import Image from 'next/image';
import { Logo } from './logo';
import { NavLink } from './nav-link';

export function Header() {
	return (
		<header className="hiddenOnPhone:px-4 sticky top-0 left-0 z-30 w-full bg-white/90 p-2 shadow-sm lg:p-4">
			<div className="flex max-w-[1440px] items-center justify-between lg:mx-auto lg:px-40">
				<div className="flex items-center gap-2">
					<Image src="/logo.png" alt="Logo" width={32} height={32} />
					<Logo className="hiddenOnPhone:hidden" />
				</div>

				{/* <Button variant="ghost" className="ml-auto lg:hidden" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
					<Menu />
				</Button> */}

				{/* <NavDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)} /> */}
				<NavLink />
			</div>
		</header>
	);
}
