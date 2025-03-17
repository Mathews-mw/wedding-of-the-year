'use client';

import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';

import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { Dialog, DialogTrigger } from './ui/dialog';
import { StoreProfileDialog } from './store-profile-dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { ChevronDown, LogOut, UserRound } from 'lucide-react';

export function AccountMenu() {
	const { data, status } = useSession();
	const router = useRouter();

	const { mutateAsync: signOutFn, isPending: isPendingSignOut } = useMutation({
		mutationFn: async () => signOut({ redirect: false }),
		onSuccess: () => {
			router.replace('/sign-in');
		},
	});

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="flex items-center gap-2 select-none">
						{status === 'loading' ? <Skeleton className="h-4 w-40" /> : data?.user?.name}
						<ChevronDown className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-56 text-slate-600">
					<DropdownMenuLabel className="flex flex-col">
						{status === 'loading' ? (
							<div className="space-y-1.5">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-24" />
							</div>
						) : (
							<>
								<span>{data?.user?.name}</span>
								<span className="text-slate-500">{data?.user?.email}</span>
							</>
						)}
					</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DialogTrigger asChild>
						<DropdownMenuItem className="cursor-pointer">
							<UserRound className="mr-2 h-4 w-4" />
							<span>Perfil do usuário</span>
						</DropdownMenuItem>
					</DialogTrigger>

					<DropdownMenuItem asChild className="text-rose-400" disabled={isPendingSignOut}>
						<button
							onClick={() => signOutFn()}
							disabled={isPendingSignOut}
							className={twMerge([
								'flex w-full cursor-pointer items-center gap-2 px-2 py-1 text-rose-400',
								'active:scale-[1.01] active:opacity-80',
								'disabled:opacity-50',
							])}
						>
							<LogOut className="mr-2 h-4 w-4 text-rose-400" />
							<span>Sair</span>
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<StoreProfileDialog />
		</Dialog>
	);
}
