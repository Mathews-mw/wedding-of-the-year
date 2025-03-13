'use client';

import { useState } from 'react';

import { listingProductsToSetupCheckout } from '@/app/api/@requests/listing-products-to-setup-checkout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/cart-context';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createCheckout } from '@/app/api/@requests/create-checkout';
import { toast } from 'sonner';
import { errorHandler } from '@/app/api/@requests/error-handler/error-handler';

export default function OrderPage() {
	const router = useRouter();
	const { items: cart, removeFromCart, clearCart } = useCart();

	const [isLoading, setIsLoading] = useState(false);
	const [nameInputValue, setNameInputValue] = useState('');
	const [messageInputValue, setMessageInputValue] = useState('');

	const productIds = cart.map((item) => item.product.id);

	const { data: products } = useQuery({
		queryKey: ['products', 'to-checkout', productIds],
		queryFn: async () =>
			listingProductsToSetupCheckout({
				productIds,
			}),
		enabled: productIds.length > 0,
	});

	const totalGiftsValue = cart.reduce((amount, value) => {
		return (amount += value.product.price * value.quantity);
	}, 0);

	const totalGiftsValueFormatted = totalGiftsValue.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});

	const { mutateAsync: createCheckoutFn } = useMutation({
		mutationFn: createCheckout,
	});

	async function handleCheckoutFormSubmit() {
		try {
			setIsLoading(true);

			const { payment_link } = await createCheckoutFn({
				productIds,
				name: nameInputValue,
				message: messageInputValue,
			});

			clearCart();
			router.push(payment_link);

			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);

			console.log(error);
			errorHandler(error);
		}
	}

	return (
		<div className="hiddenOnPhone:px-4 mt-8 space-y-8">
			<h3 className="text-2xl font-semibold">Resumo da sua compra</h3>

			<div className="flex w-full flex-col gap-4">
				<div>
					<ul className="space-y-4">
						{products?.map((item) => {
							return (
								<li key={item.id}>
									<div className="flex w-full justify-between">
										<div className="flex items-start gap-4">
											<Image
												src={item.image}
												width={60}
												height={60}
												alt={item.title}
												className="h-[60px] w-[60px] rounded-md object-cover"
											/>

											<div className="flex flex-col">
												<span>{item.title}</span>
												<Button variant="ghost" size="icon" onClick={() => removeFromCart({ productId: item.id })}>
													<Trash2 className="text-rose-400" />
												</Button>
											</div>
										</div>
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
				</div>

				<Separator />

				<div className="flex w-full justify-between">
					<strong>Valor total dos presentes: </strong>
					<strong>{totalGiftsValueFormatted}</strong>
				</div>
			</div>

			<div className="mt-auto space-y-5 rounded-lg border p-4">
				<h5 className="text-lg font-semibold">Gostaria de deixar uma mensagem de carinho?</h5>

				<div className="space-y-5">
					<div className="space-y-2">
						<Label htmlFor="name" className="font-semibold">
							Insira seu nome
						</Label>

						<Input
							id="name"
							placeholder="Nome completo"
							value={nameInputValue}
							onChange={(e) => setNameInputValue(e.target.value)}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="message" className="font-semibold">
							Escreva sua mensagem personalizada
						</Label>

						<Textarea
							id="message"
							placeholder="Fique a vontade para deixar sua mensagem de carinho para o casal..."
							value={messageInputValue}
							onChange={(e) => setMessageInputValue(e.target.value)}
						/>
					</div>
				</div>
			</div>

			<div className="flex w-full flex-col justify-end gap-4 lg:flex-row">
				<Button type="button" variant="outline" onClick={() => router.push('/presentes')} disabled={isLoading}>
					Voltar para os presentes
				</Button>

				<Button
					type="submit"
					className="flex items-center justify-center gap-2"
					disabled={productIds.length <= 0 || isLoading}
					onClick={() => handleCheckoutFormSubmit()}
				>
					Finalizar compra
				</Button>
			</div>
		</div>
	);
}
