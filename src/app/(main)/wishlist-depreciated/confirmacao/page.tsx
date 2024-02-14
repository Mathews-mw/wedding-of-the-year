'use client';

import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '@/zustand-store';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { api } from '@/lib/axios';
import { Button } from '@/components/Buttons';
import { errorHandler } from '@/utils/error-handler';
import { Spinner } from '@/components/Loaders/Spinner';
import { InputControl, InputRoot } from '@/components/Form/Input';
import { toast } from 'sonner';

const formSchema = z.object({
	name: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	email: z.string().min(1, { message: 'Por favor, preencha o campo.' }),
	// .email({ message: 'Por favor, preencha com um e-mail válido.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function WishlistConfirmationPage() {
	const [loading, setLoading] = useState(false);

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
	});

	const router = useRouter();

	const { wishlist } = useStore((store) => {
		return {
			wishlist: store.wishlist,
		};
	});

	async function handleWishlistFormSubmit(data: FormData) {
		try {
			setLoading(true);

			const giftsIds = wishlist.map((gift) => gift.id);

			const { data: result } = await api.post('/wishlist', {
				giftsIds,
				name: data.name,
				email: data.email,
			});

			reset();

			router.push(`/wishlist/confirmacao/${result.wishlistId}?guest=${result.guest}`);
			setLoading(false);
			toast.success(result.message);
		} catch (error) {
			console.log(error);
			setLoading(false);
			errorHandler(error);
		}
	}

	return (
		<div className="mt-8 space-y-8 hiddenOnPhone:px-4">
			<h3 className="text-2xl font-semibold">Confirme sua lista de desejos</h3>

			<div className="flex w-full flex-col">
				<ul>
					{wishlist.map((item) => {
						return (
							<li key={item.id}>
								<div className="flex w-full justify-between">
									<span>❤ {item.title}</span>
									<span>
										{item.price.toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'BRL',
										})}
									</span>
								</div>
							</li>
						);
					})}
				</ul>

				<div className="my-4 h-px w-full bg-slate-300" />
			</div>

			<form
				onSubmit={handleSubmit(handleWishlistFormSubmit)}
				className="mt-auto h-full space-y-5"
			>
				<h5 className="text-lg font-semibold">
					Informe o seu <strong>nome</strong> e <strong>e-mail</strong>, por favor.
				</h5>

				<div className="space-y-5">
					<div className="space-y-2">
						<label htmlFor="name" className="font-semibold">
							Nome
						</label>
						<InputRoot>
							<InputControl id="name" placeholder="Nome completo" {...register('name')} />
						</InputRoot>
						<small className="text-rose-500">{errors.name?.message}</small>
					</div>

					<div className="space-y-2">
						<label htmlFor="email" className="font-semibold">
							E-mail
						</label>
						<InputRoot>
							<InputControl
								id="email"
								// type="email"
								placeholder="Nome completo"
								{...register('email')}
							/>
						</InputRoot>
						<small className="text-rose-500">{errors.name?.message}</small>
					</div>
				</div>

				<div className="flex w-full flex-col justify-end gap-4 lg:flex-row">
					<Button
						type="button"
						variant="slate"
						onClick={() => router.push('/wishlist')}
						disabled={loading || isSubmitting}
					>
						Voltar para a lista de desejos
					</Button>

					<Button
						type="submit"
						className="flex items-center justify-center gap-2"
						disabled={loading || isSubmitting}
					>
						Confirmar
						{loading && <Spinner />}
					</Button>
				</div>
			</form>
		</div>
	);
}
