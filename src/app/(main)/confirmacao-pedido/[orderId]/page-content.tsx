import Image from 'next/image';

import PaymentSuccess from '@/../public/payment-success.png';

interface IProps {
	orderId: string;
}

export default function PageContent({ orderId }: IProps) {
	const { data: orderDetails } = useQuery({
		queryKey: ['order-details', orderId],
		queryFn: async () => getOrderDetailsById({ orderId }),
	});

	return (
		<div className="hiddenOnPhone:px-4 flex w-full flex-col">
			<h3 className="mt-8 text-2xl font-semibold">Confirmação da compra</h3>

			<div className="mt-20 flex h-full w-full flex-col items-center justify-center space-y-4">
				<p className="text-lg font-semibold">Seu compra foi realizada com sucesso!</p>
				<Image src={PaymentSuccess} alt="Pagamento Realizado" quality={100} />

				<p className="text-center">
					Gratidão total por contribuir com a nossa lista de presentes. Ficamos muito felizes com a sua generosidade e
					participação.
				</p>
			</div>
		</div>
	);
}
