'use client';

import { Button } from '@/components/Buttons';
import { InputControl, InputRoot } from '@/components/Form/Input';
import { Textarea } from '@/components/Form/Textarea';
import { useStore } from '@/zustand-store';
import { useRouter } from 'next/navigation';

export default function OrderPage() {
	const router = useRouter();

	const { order } = useStore((store) => {
		return {
			order: store.order,
		};
	});

	const totalGiftsValue = order.reduce((amount, value) => {
		return (amount += value.price);
	}, 0);
	const totalGiftsValueFormatted = totalGiftsValue.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});

	return (
		<div className="mt-8 space-y-8">
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

			<div className="space-y-5">
				<h5 className="text-lg font-semibold">Gostaria de deixar uma mensagem de carinho?</h5>

				<div className="space-y-5">
					<div className="space-y-2">
						<label htmlFor="name" className="font-semibold">
							Insira seu nome
						</label>
						<InputRoot>
							<InputControl id="name" placeholder="Nome completo" />
						</InputRoot>
					</div>

					<div className="space-y-2">
						<label htmlFor="message" className="font-semibold">
							Escreva sua mensagem personalizada
						</label>
						<Textarea
							id="message"
							placeholder="Fique a vontade para deixar sua mensagem de carinho para o casal..."
						/>
					</div>
				</div>

				<div className="flex w-full justify-end gap-4">
					<Button variant="slate" onClick={() => router.push('/presentes')}>
						Voltar para o carrinho
					</Button>
					<Button>Finalizar compra</Button>
				</div>
			</div>
		</div>
	);
}
