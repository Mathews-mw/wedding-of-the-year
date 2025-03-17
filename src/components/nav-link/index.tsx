'use client';

import { useSession } from 'next-auth/react';

import { NavItem } from './nav-item';

import { AccountMenu } from '../account-menu';
import { Separator } from '../ui/separator';
import { Slash } from 'lucide-react';

export function NavLink() {
	const { data, status } = useSession();

	return (
		<nav className="hidden gap-2 lg:flex lg:flex-row lg:items-center">
			<NavItem href="/" title="Home" />
			<NavItem href="/presentes" title="Lista de presentes" />
			<NavItem href="/presenca" title="Confirme sua presença" />
			{status === 'authenticated' && data.user.isAdmin && <NavItem href="/metricas" title="Métricas" />}

			{status === 'authenticated' && <AccountMenu />}
		</nav>
	);
}
