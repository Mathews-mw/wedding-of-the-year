import { useSession } from 'next-auth/react';

import { NavItem } from './nav-item';

import { AccountMenu } from '../account-menu';

export function NavLink() {
	// const { status } = useSession();

	return (
		<nav className="hiddenOnPhone:hidden flex flex-row items-center space-x-4">
			<NavItem href="/" title="Home" />
			{/* <NavItem href="/wishlist" title="Lista de desejos" /> */}
			<NavItem href="/presentes" title="Lista de presentes" />
			<NavItem href="/presenca" title="Confirme sua presença" />

			{/* {status === 'authenticated' && <NavItem href="/metricas" title="Métricas" />} */}

			{/* {status === 'authenticated' && <AccountMenu />} */}
		</nav>
	);
}
