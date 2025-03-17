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

import { LogOut, PanelLeft, UserRound } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { StoreProfileDialog } from '../store-profile-dialog';
import { twMerge } from 'tailwind-merge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DialogTitle } from '@radix-ui/react-dialog';
import { SignOutDialog } from '../sign-out-dialog';

export function AppSidebar() {
	const { data, status } = useSession();

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
						<VisuallyHidden>
							<SheetTitle>Casamento F & L</SheetTitle>
						</VisuallyHidden>
						{status === 'authenticated' && data.user ? (
							<div className="flex items-center gap-2">
								<Avatar className="size-12">
									<AvatarImage src="https://genrandom.com/api/cat" />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<div className="flex flex-col">
									<span className="text-muted-foreground text-sm">{data?.user?.name}</span>
									<span className="text-muted-foreground text-sm">{data?.user?.email}</span>
								</div>
							</div>
						) : (
							<div className="flex flex-col items-start justify-start gap-2">
								<div className="flex items-center gap-2">
									<Image src="/logo.png" alt="Logo" width={32} height={32} />
									<span className="text-lg font-bold text-rose-300">Casamento F & L</span>
								</div>
							</div>
						)}
					</SheetHeader>

					<Separator />

					<div className="my-4 space-y-4">
						<nav className="flex flex-col gap-1">
							<NavItem href="/" title="Home" onSelectItem={() => setIsOpen(!isOpen)} />
							<NavItem href="/presentes" title="Lista de presentes" onSelectItem={() => setIsOpen(!isOpen)} />
							<NavItem href="/presenca" title="Confirme sua presença" onSelectItem={() => setIsOpen(!isOpen)} />
							{status === 'authenticated' && data.user.isAdmin && (
								<NavItem href="/metricas" title="Métricas" onSelectItem={() => setIsOpen(!isOpen)} />
							)}
						</nav>

						{status === 'authenticated' && data.user && (
							<>
								<Separator />

								<div className="flex flex-col gap-4 p-2">
									<Dialog>
										<DialogTrigger asChild>
											<button
												className={twMerge([
													'text-complementary-deep flex w-full cursor-pointer items-start gap-2',
													'active:scale-[1.01] active:opacity-80',
													'disabled:opacity-50',
												])}
											>
												<UserRound className="size-5" />
												<span>Perfil do usuário</span>
											</button>
										</DialogTrigger>

										<StoreProfileDialog />
									</Dialog>

									<Dialog>
										<DialogTrigger asChild>
											<button
												className={twMerge([
													'flex w-full cursor-pointer items-center gap-2 text-rose-400',
													'active:scale-[1.01] active:opacity-80',
													'disabled:opacity-50',
												])}
											>
												<LogOut className="size-5" />
												<span>Sair</span>
											</button>
										</DialogTrigger>

										<SignOutDialog />
									</Dialog>
								</div>
							</>
						)}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
