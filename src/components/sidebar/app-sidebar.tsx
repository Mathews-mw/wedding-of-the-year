'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { Logo } from '../logo';
import { Label } from '../ui/label';
import { NavItem } from './nav-item';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';

import { PanelLeft } from 'lucide-react';
import Image from 'next/image';

export function AppSidebar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost">
					<PanelLeft className="text-primary h-6 w-6" />
				</Button>
			</SheetTrigger>

			<SheetContent side="left" className="max-h-screen w-[300px] lg:w-[500px]">
				<div className="relative flex h-full flex-col">
					<SheetHeader>
						<div className="flex flex-col items-start justify-start gap-2">
							<VisuallyHidden>
								<SheetTitle>Casamento F & L</SheetTitle>
							</VisuallyHidden>

							<div className="flex items-center gap-2">
								<Image src="/logo.png" alt="Logo" width={32} height={32} />
								<span className="text-lg font-bold text-rose-300">Casamento F & L</span>
							</div>
						</div>
					</SheetHeader>

					<div className="my-4">
						<Separator />
					</div>

					<div className="space-y-4">
						<nav className="flex flex-col gap-1">
							<NavItem href="/" title="Home" onSelectItem={() => setIsOpen(!isOpen)} />
							<NavItem href="/presentes" title="Lista de presentes" onSelectItem={() => setIsOpen(!isOpen)} />
							<NavItem href="/presenca" title="Confirme sua presença" onSelectItem={() => setIsOpen(!isOpen)} />
						</nav>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
