'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { updateUser } from '@/app/api/@requests/update-user';
import { updateUserPassword } from '@/app/api/@requests/update-user-password';
import { errorHandler } from '@/app/api/@requests/error-handler/error-handler';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';

import { Loader2 } from 'lucide-react';

const profileForm = z.object({
	name: z.string(),
	newPassword: z.string().nullable(),
	currentPassword: z.string().nullable(),
});

type ProfileForm = z.infer<typeof profileForm>;

export function StoreProfileDialog() {
	const { data, update } = useSession();

	const {
		handleSubmit,
		register,
		formState: { isSubmitting },
	} = useForm<ProfileForm>({
		resolver: zodResolver(profileForm),
		values: {
			name: data?.user.name ?? '',
			currentPassword: '',
			newPassword: '',
		},
	});

	function updateUserProfileCache(name?: string | null) {
		const cached = data?.user;

		if (name) {
			update({
				name,
			});
		}

		return { cached };
	}

	const { mutateAsync: updateProfileFn } = useMutation({
		mutationFn: async ({ name, newPassword, currentPassword }: ProfileForm) => {
			if (!data) {
				return;
			}

			await updateUser({ userId: data.user.id, name });

			if (newPassword && currentPassword) {
				await updateUserPassword({
					userId: data.user.id,
					currentPassword,
					newPassword,
				});
			}
		},
		onMutate({ name }) {
			const { cached } = updateUserProfileCache(name);

			return { previousProfile: cached };
		},
		onError(_, __, context) {
			if (context?.previousProfile) {
				updateUserProfileCache(context.previousProfile.name);
			}
		},
	});

	async function handleProfileFormSubmit(data: ProfileForm) {
		try {
			await updateProfileFn({
				name: data.name,
				newPassword: data.newPassword,
				currentPassword: data.currentPassword,
			});

			toast.success('Perfil atualizado com sucesso.');
		} catch (error) {
			errorHandler(error);
		}
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Perfil do usuário</DialogTitle>
				<DialogDescription>Atualize as informações do seu perfil.</DialogDescription>
			</DialogHeader>

			<form onSubmit={handleSubmit(handleProfileFormSubmit)}>
				<div className="space-y-4 py-4">
					<div className="items-center gap-4 lg:grid lg:grid-cols-4">
						<label className="text-complementary-deep text-right text-sm font-bold" htmlFor="name">
							Nome
						</label>

						<div className="col-span-3">
							<Input id="name" {...register('name')} />
						</div>
					</div>
					<div className="items-center gap-4 lg:grid lg:grid-cols-4">
						<label className="text-complementary-deep text-right text-sm font-bold" htmlFor="currentPassword">
							Senha atual
						</label>

						<div className="col-span-3">
							<Input id="currentPassword" type="password" {...register('currentPassword')} />
						</div>
					</div>
					<div className="items-center gap-4 lg:grid lg:grid-cols-4">
						<label className="text-complementary-deep text-right text-sm font-bold" htmlFor="newPassword">
							Nova senha
						</label>

						<div className="col-span-3">
							<Input id="newPassword" type="password" {...register('newPassword')} />
						</div>
					</div>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="ghost" disabled={isSubmitting}>
							Cancelar
						</Button>
					</DialogClose>

					<Button type="submit" disabled={isSubmitting}>
						Salvar
						{isSubmitting && <Loader2 className="animate-spin" />}
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	);
}
