import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';
import { ICheckoutNotification } from '@/types/pag-seguro';

export async function POST(request: NextRequest) {
	const data: ICheckoutNotification = await request.json();

	try {
		const order = await prisma.order.findUnique({
			where: {
				referenceId: data.reference_id,
			},
		});

		const products = await prisma.orderProducts.findMany({
			where: {
				itemReferenceId: data.reference_id,
			},
		});

		if (order) {
			order.customerName = data.customer.name;
			order.customerEmail = data.customer.email;
			order.customerCpf = data.customer.tax_id;
			order.status = 'PAID';

			await prisma.order.update({
				data: order,
				where: {
					id: order.id,
				},
			});
		}

		if (products.length > 0) {
			for (let product of products) {
				const gift = await prisma.gift.findUnique({
					where: {
						id: product.giftId,
					},
				});

				if (gift) {
					gift.amount = gift.amount - 1;
					gift.available = gift.amount !== 0;

					await prisma.gift.update({
						data: gift,
						where: {
							id: gift.id,
						},
					});
				}
			}
		}

		return Response.json({
			message: 'Operação concluída com sucesso.',
		});
	} catch (error) {
		console.log('order notification route error: ', error);
		return new Response('Ops! Parece que algo deu errado.', {
			status: 400,
		});
	}
}
