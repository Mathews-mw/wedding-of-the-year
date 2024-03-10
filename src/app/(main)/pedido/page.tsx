'use client';

import { z } from 'zod';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from '@/zustand-store';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { api } from '@/lib/axios';
import { Button } from '@/components/Buttons';
import { errorHandler } from '@/utils/error-handler';
import { Textarea } from '@/components/Form/Textarea';
import { Spinner } from '@/components/Loaders/Spinner';
import { InputControl, InputRoot } from '@/components/Form/Input';
import { getCookie } from '@/utils/get-cookies';

const formSchema = z.object({
	name: z.optional(z.string()),
	message: z.optional(z.string()),
});

type FormData = z.infer<typeof formSchema>;

export default function OrderPage() {
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

	const { order, loadingExistingOrder } = useStore((store) => {
		return {
			order: store.order,
			loadingExistingOrder: store.loadingExistingOrder,
		};
	});

	const totalGiftsValue = order.reduce((amount, value) => {
		return (amount += value.price);
	}, 0);
	const totalGiftsValueFormatted = totalGiftsValue.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});

	async function handleCheckoutFormSubmit(data: FormData) {
		try {
			setLoading(true);

			const giftsIds = order.map((gift) => gift.id);

			const { data: result } = await api.post('/order', {
				giftsIds,
				name: data.name,
				message: data.message,
			});

			reset();

			router.push(result.payment_link);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
			errorHandler(error);
		}
	}

	async function checkExistenceOfSameOrder() {
		const checkoutIdCookiesStored = await getCookie('@WEDDING_N&R_CHECKOUT_ID');
		const orderIdCookiesStored = await getCookie('@WEDDING_N&R_ORDER_ID');

		console.log('checkoutIdCookiesStored: ', checkoutIdCookiesStored);
		console.log('orderIdCookiesStored: ', orderIdCookiesStored);

		if (checkoutIdCookiesStored && orderIdCookiesStored) {
			loadingExistingOrder({
				checkoutId: checkoutIdCookiesStored.value,
				orderId: orderIdCookiesStored.value,
			});
		} else {
			if (order.length === 0) {
				router.replace('/presentes');
			}
		}
	}

	useEffect(() => {
		checkExistenceOfSameOrder();
	}, []);

	return (
		<div className="mt-8 space-y-8 hiddenOnPhone:px-4">
			<h3 className="text-2xl font-semibold">Resumo da sua compra</h3>

			<div className="flex w-full flex-col">
				<ul>
					{order.map((item) => {
						return (
							<li key={item.id}>
								<div className="flex w-full justify-between">
									<span>{item.title}</span>
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

				<div className="flex w-full justify-between">
					<strong>Valor total dos presentes: </strong>
					<strong>{totalGiftsValueFormatted}</strong>
				</div>
			</div>

			<form
				onSubmit={handleSubmit(handleCheckoutFormSubmit)}
				className="mt-auto h-full space-y-5"
			>
				<h5 className="text-lg font-semibold">Gostaria de deixar uma mensagem de carinho?</h5>

				<div className="space-y-5">
					<div className="space-y-2">
						<label htmlFor="name" className="font-semibold">
							Insira seu nome
						</label>
						<InputRoot>
							<InputControl id="name" placeholder="Nome completo" {...register('name')} />
						</InputRoot>
					</div>

					<div className="space-y-2">
						<label htmlFor="message" className="font-semibold">
							Escreva sua mensagem personalizada
						</label>
						<Textarea
							id="message"
							placeholder="Fique a vontade para deixar sua mensagem de carinho para o casal..."
							{...register('message')}
						/>
					</div>
				</div>

				<div className="flex w-full flex-col justify-end gap-4 lg:flex-row">
					<Button
						type="button"
						variant="outline"
						onClick={() => router.push('/presentes')}
						disabled={loading || isSubmitting}
					>
						Voltar para o carrinho
					</Button>

					<Button
						type="submit"
						className="flex items-center justify-center gap-2"
						disabled={loading || isSubmitting}
					>
						Finalizar compra
						{loading && <Spinner />}
					</Button>
				</div>
			</form>
		</div>
	);
}
