import { useSession } from 'next-auth/react';

import { NavItem } from './nav-item';

import { AccountMenu } from '../account-menu';

export function NavLink() {
	// const { status } = useSession();

	return (
		<nav className="hidden space-x-4 lg:flex lg:flex-row lg:items-center">
			<NavItem href="/" title="Home" />
			<NavItem href="/presentes" title="Lista de presentes" />
			<NavItem href="/presenca" title="Confirme sua presença" />

			{/* {status === 'authenticated' && <NavItem href="/metricas" title="Métricas" />} */}

			{/* {status === 'authenticated' && <AccountMenu />} */}
		</nav>
	);
}
