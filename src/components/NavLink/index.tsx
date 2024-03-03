import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { NavItem } from './NavItem';
import { Button } from '../Buttons';
import { AccountMenu } from '../account-menu';

import { LayoutDashboard, Loader2 } from 'lucide-react';

export function NavLink() {
	const { status } = useSession();

	return (
		<nav className="flex flex-row items-center space-x-4 hiddenOnPhone:hidden">
			<NavItem href="/" title="Home" />
			{/* <NavItem href="/wishlist" title="Lista de desejos" /> */}
			<NavItem href="/presentes" title="Lista de presentes" />
			<NavItem href="/presenca" title="Confirme sua presença" />

			{status === 'authenticated' && <NavItem href="/metricas" title="Métricas" />}

			<div className="h-8 w-px bg-zinc-200" />

			{status === 'authenticated' ? (
				<AccountMenu />
			) : status === 'unauthenticated' ? (
				<Button variant="ghost">
					<Link href="/sign-in">
						<LayoutDashboard className="h-5 w-5 fill-rose-400 stroke-rose-400" />
					</Link>
				</Button>
			) : (
				<Loader2 className="h-5 w-5 animate-spin text-rose-500" />
			)}
		</nav>
	);
}
