'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

export function SignOutDialog() {
	const router = useRouter();

	const { mutateAsync: signOutFn, isPending: isPendingSignOut } = useMutation({
		mutationFn: async () => signOut({ redirect: false }),
		onSuccess: () => {
			router.replace('/sign-in');
		},
	});

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Você deseja realmente sair?</DialogTitle>
			</DialogHeader>
			<DialogFooter>
				<DialogClose asChild>
					<Button type="button" variant="ghost" disabled={isPendingSignOut}>
						Cancelar
					</Button>
				</DialogClose>

				<Button type="button" onClick={() => signOutFn()} disabled={isPendingSignOut}>
					Sair
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}
