import { NavItem } from './NavItem';

export function NavLink() {
	return (
		<nav className="flex flex-row space-x-4">
			<NavItem href="/" title="Home" />
			<NavItem href="#recepcao" title="Recepção" />
			<NavItem href="/presentes" title="Lista de presentes" />
			<NavItem href="/presenca" title="Confirme sua presença" />
		</nav>
	);
}