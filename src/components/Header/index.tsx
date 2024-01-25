import { NavLink } from '../NavLink';
import { Logo } from './Logo';

export function Header() {
	return (
		<header className="sticky left-0 top-0 z-50 w-full bg-white/90 p-4 shadow-sm">
			<div className="mx-auto flex max-w-[1440px] items-center justify-between px-40">
				<Logo />

				<NavLink />
			</div>
		</header>
	);
}
