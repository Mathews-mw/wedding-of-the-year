'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import PaymentSuccess from '@/../public/payment-success.png';
import { getOrderDetails } from '@/app/api/@requests/get-order-details';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag } from 'lucide-react';

interface IProps {
	orderId: string;
}

export default function PageContent({ orderId }: IProps) {
	const router = useRouter();

	const { data: orderDetails, isFetched } = useQuery({
		queryKey: ['order-details', orderId],
		queryFn: async () => getOrderDetails({ orderId }),
	});

	const totalOrder = orderDetails
		? orderDetails.orderProducts.reduce((amount, value) => {
				return (amount += value.price * value.itemQuantity);
			}, 0)
		: 0;

	const totalOrderFormatted = totalOrder.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});

	if (isFetched && !orderDetails) {
		return router.replace('/');
	}

	return (
		<div className="hiddenOnPhone:px-4 flex w-full flex-col">
			<h3 className="mt-8 text-2xl font-semibold">Confirmação da compra</h3>

			<div className="mt-20 flex h-full w-full flex-col items-center justify-center space-y-4">
				<p className="text-lg font-semibold">Seu compra foi realizada com sucesso!</p>
				<Image src={PaymentSuccess} alt="Pagamento Realizado" quality={100} />

				<p className="text-center">
					{orderDetails?.customerName}, gratidão total por contribuir com a nossa lista de presentes. Ficamos muito
					felizes com a sua generosidade e participação.
				</p>
			</div>

			<div className="mt-8 space-y-4">
				<div className="flex items-center gap-2">
					<ShoppingBag />
					<h4 className="text-lg font-semibold">Detalhes do pedido</h4>
				</div>

				<div className="rounded-md border p-4 shadow-sm">
					<ul className="space-y-4">
						{orderDetails?.orderProducts.map((item) => {
							return (
								<li key={item.id}>
									<div className="flex w-full justify-between">
										<div className="flex items-start gap-4">
											<Image
												src={item.product.image}
												width={60}
												height={60}
												alt={item.itemName}
												className="h-[60px] w-[60px] rounded-md object-cover"
											/>

											<div className="flex flex-col">
												<span>{item.itemName}</span>
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

					<Separator />

					<div className="flex w-full justify-between py-2 pl-4">
						<span>Total</span>
						<span className="font-bold">{totalOrderFormatted}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
