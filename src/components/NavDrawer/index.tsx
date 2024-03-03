import Link from 'next/link';
import Drawer from 'react-modern-drawer';
import { useSession } from 'next-auth/react';

import { Logo } from '../Logo';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { NavItem } from '../NavLink/NavItem';
import { AccountMenuMobile } from '../account-menu-mobile';

import { LayoutDashboard, Loader2 } from 'lucide-react';

interface INavDrawerProps {
	isDrawerOpen: boolean;
	toggleDrawer: () => void;
}

export function NavDrawer({ isDrawerOpen, toggleDrawer }: INavDrawerProps) {
	const { status } = useSession();

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

				<Separator />

				<div className="flex h-full flex-col justify-between">
					<nav className="flex flex-col">
						<NavItem href="/" title="Home" toggleDrawer={toggleDrawer} />
						<NavItem href="/presentes" title="Lista de presentes" toggleDrawer={toggleDrawer} />
						<NavItem
							href="/presenca"
							title="Confirme sua presença"
							toggleDrawer={toggleDrawer}
						/>
						{status === 'authenticated' && <NavItem href="/metricas" title="Métricas" />}
					</nav>

					<div className="space-y-2.5">
						<Separator />

						{status === 'authenticated' ? (
							<AccountMenuMobile />
						) : status === 'unauthenticated' ? (
							<Button variant="ghost">
								<Link href="/sign-in">
									<LayoutDashboard className="h-5 w-5 fill-rose-400 stroke-rose-400" />
								</Link>
							</Button>
						) : (
							<Loader2 className="h-5 w-5 animate-spin text-rose-500" />
						)}
					</div>
				</div>
			</div>
		</Drawer>
	);
}
