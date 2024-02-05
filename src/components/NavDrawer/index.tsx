import Drawer from 'react-modern-drawer';

import { Logo } from '../Logo';
import { NavItem } from '../NavLink/NavItem';

interface INavDrawerProps {
	isDrawerOpen: boolean;
	toggleDrawer: () => void;
}

export function NavDrawer({ isDrawerOpen, toggleDrawer }: INavDrawerProps) {
	return (
		<Drawer
			open={isDrawerOpen}
			onClose={toggleDrawer}
			direction="left"
			size={300}
			duration={400}
			lockBackgroundScroll
		>
			<div className="flex h-full flex-col gap-4 p-4">
				<Logo />

				<div className="w-full border border-slate-100" />

				<nav className="flex flex-col">
					<NavItem href="/" title="Home" toggleDrawer={toggleDrawer} />
					<NavItem href="/presentes" title="Lista de presentes" toggleDrawer={toggleDrawer} />
					<NavItem href="/presenca" title="Confirme sua presença" toggleDrawer={toggleDrawer} />
				</nav>
			</div>
		</Drawer>
	);
}
