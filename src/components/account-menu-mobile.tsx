import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';

import { Skeleton } from './ui/skeleton';
import { Dialog, DialogTrigger } from './ui/dialog';
import { StoreProfileDialog } from './store-profile-dialog';

import { LogOut, UserRound } from 'lucide-react';

export function AccountMenuMobile() {
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
			<div>
				<div className="flex flex-col">
					{data ? (
						<>
							<span>{data.user.name}</span>
							<small>{data.user.email}</small>
						</>
					) : (
						<div className="space-y-1">
							<Skeleton className="h-4" />
							<Skeleton className="h-3" />
						</div>
					)}
				</div>

				<div className="mt-2 space-y-2">
					<DialogTrigger asChild>
						<button
							className={twMerge([
								'flex w-full items-center gap-2 rounded-lg border px-2 py-1',
								'active:scale-[1.01] active:opacity-80',
								'disabled:opacity-50',
							])}
						>
							<UserRound className="h-4 w-4" strokeWidth={2} />
							<span className="font-semibold">Perfil do usuário</span>
						</button>
					</DialogTrigger>

					<button
						onClick={() => signOutFn()}
						disabled={isPendingSignOut}
						className={twMerge([
							'flex w-full items-center gap-2 rounded-lg border px-2 py-1 text-rose-400',
							'active:scale-[1.01] active:opacity-80',
							'disabled:opacity-50',
						])}
					>
						<LogOut className="h-4 w-4" strokeWidth={2} />
						<span className="font-semibold">Sair</span>
					</button>
				</div>
			</div>

			<StoreProfileDialog />
		</Dialog>
	);
}
