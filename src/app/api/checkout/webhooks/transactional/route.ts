import { NextRequest } from 'next/server';
import { OrderPaymentType, OrderStatus } from '@prisma/client';

import { prisma } from '@/lib/prisma';

// Os eventos transacionais são chamados quando uma alteração do status do pagamento ocorre.

export async function POST(request: NextRequest) {
	const data: ITransactionalNotification = await request.json();

	console.log('pagbank transactional webhook notification: ', data);

	try {
		let orderStatus: OrderStatus;
		let paymentMethod: OrderPaymentType;

		switch (data.charges[0].status) {
			case 'CANCELED':
				orderStatus = 'CANCELED';
				break;
			case 'DECLINED':
				orderStatus = 'DECLINED';
				break;
			case 'IN_ANALYSIS':
				orderStatus = 'IN_ANALYSIS';
				break;
			case 'PAID':
				orderStatus = 'PAID';
				break;
			case 'WAITING':
				orderStatus = 'AWAITING';
				break;
			default:
				orderStatus = 'AWAITING';
		}

		switch (data.charges[0].payment_method.type) {
			case 'CREDIT_CARD':
				paymentMethod = 'CARTAO_CREDITO';
				break;
			case 'DEBIT_CARD':
				paymentMethod = 'DEBITO';
				break;
			case 'BOLETO':
				paymentMethod = 'BOLETO';
				break;
			case 'PIX':
				paymentMethod = 'PIX';
				break;
			default:
				paymentMethod = 'A_DEFINIR';
		}

		const order = await prisma.order.findUnique({
			where: {
				referenceId: data.reference_id,
			},
		});

		if (order) {
			const products = await prisma.orderProduct.findMany({
				where: {
					orderId: order.id,
				},
			});

			order.customerName = data.customer.name;
			order.customerEmail = data.customer.email;
			order.customerCpf = data.customer.tax_id;
			order.status = orderStatus;
			order.paymentType = paymentMethod;

			await prisma.order.update({
				data: order,
				where: {
					id: order.id,
				},
			});

			if (products.length > 0) {
				for (let product of products) {
					const dbProduct = await prisma.product.findUnique({
						where: {
							id: product.productId,
						},
					});

					if (dbProduct) {
						dbProduct.amount = dbProduct.amount - 1;
						dbProduct.available = dbProduct.amount > 0;

						await prisma.product.update({
							data: dbProduct,
							where: {
								id: dbProduct.id,
							},
						});
					}
				}
			}
		}

		return Response.json(
			{
				message: 'Operação concluída com sucesso.',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('order notification route error: ', error);
		return new Response('Ops! Parece que algo deu errado.', {
			status: 400,
		});
	}
}
