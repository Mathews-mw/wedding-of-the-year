import { NavItem } from './NavItem';

export function NavLink() {
	return (
		<nav className="flex flex-row space-x-4 hiddenOnPhone:hidden">
			<NavItem href="/" title="Home" />
			<NavItem href="/wishlist" title="Lista de desejos" />
			<NavItem href="/presentes" title="Lista de presentes" />
			<NavItem href="/presenca" title="Confirme sua presença" />
		</nav>
	);
}
