import Image from 'next/image';
import { Logo } from './logo';
import { NavLink } from './nav-link';
import { AppSidebar } from './sidebar/app-sidebar';

export function Header() {
	return (
		<header className="fixed top-0 z-50 w-full bg-white/90 p-2 shadow-sm lg:sticky lg:p-4">
			<div className="flex max-w-[1440px] items-center justify-between lg:mx-auto lg:px-40">
				<div>
					<div className="lg:hidden">
						<AppSidebar />
					</div>

					<div className="hidden items-center gap-2 lg:flex">
						<Image src="/logo.png" alt="Logo" width={32} height={32} />
						<Logo className="hiddenOnPhone:hidden" />
					</div>
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
