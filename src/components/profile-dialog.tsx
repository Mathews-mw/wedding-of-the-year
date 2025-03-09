import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { api } from '@/lib/axios';
import { Button } from './Buttons';
import { errorHandler } from '@/utils/error-handler';
import { InputControl, InputRoot } from './Form/Input';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';

const profileForm = z.object({
	name: z.string().nullable(),
	newPassword: z.string().nullable(),
	currentPassword: z.string().nullable(),
});

type ProfileForm = z.infer<typeof profileForm>;

export function ProfileDialog() {
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

	function updateUserProfileCache(name: string | null) {
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
			await api.put(`/user/update/${data?.user.id}`, {
				name,
			});

			if (newPassword && currentPassword) {
				await api.patch(`/user/update/${data?.user.id}/password`, {
					current_password: currentPassword,
					new_password: newPassword,
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
					<div className="grid grid-cols-4 items-center gap-4">
						<label className="text-right" htmlFor="name">
							Nome
						</label>

						<div className="col-span-3">
							<InputRoot>
								<InputControl id="name" {...register('name')} />
							</InputRoot>
						</div>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<label className="text-right" htmlFor="currentPassword">
							Senha atual
						</label>

						<div className="col-span-3">
							<InputRoot>
								<InputControl id="currentPassword" type="password" {...register('currentPassword')} />
							</InputRoot>
						</div>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<label className="text-right" htmlFor="newPassword">
							Nova senha
						</label>

						<div className="col-span-3">
							<InputRoot>
								<InputControl id="newPassword" type="password" {...register('newPassword')} />
							</InputRoot>
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
					</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	);
}
