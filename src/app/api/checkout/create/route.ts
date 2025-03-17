import { z } from 'zod';
import dayjs from 'dayjs';
import { HTTPError } from 'ky';
import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/env';
import { prisma } from '@/lib/prisma';
import { pagBankAPI } from '@/lib/pagbank/pagbank-api';

const bodySchema = z.object({
	productIds: z.array(z.string()),
	name: z.optional(z.string()),
	message: z.optional(z.string()),
});

export async function POST(request: NextRequest) {
	if (request.method !== 'POST') {
		return Response.json(
			{
				error: 'Método não permitido',
			},
			{ status: 405 }
		);
	}

	const data = await request.json();

	const { productIds, name, message } = bodySchema.parse(data);

	try {
		const products = await prisma.product.findMany({
			where: {
				id: {
					in: productIds,
				},
			},
		});

		const checkoutItems = products.map((product) => {
			return {
				reference_id: product.id,
				name: product.title,
				quantity: 1,
				unit_amount: product.price * 100,
			};
		});

		const orderId = randomUUID();
		const expirationDate = dayjs().add(1, 'day');

		const pagBankResponse = await pagBankAPI
			.post('checkouts', {
				json: {
					reference_id: randomUUID(),
					expiration_date: expirationDate.toDate(),
					customer_modifiable: true,
					items: checkoutItems,
					additional_amount: 0,
					discount_amount: 0,
					payment_methods: [
						{
							type: 'CREDIT_CARD',
							brands: ['MASTERCARD', 'VISA'],
						},
						{
							type: 'DEBIT_CARD',
							brands: ['MASTERCARD', 'VISA'],
						},
						{
							type: 'PIX',
						},
						{
							type: 'BOLETO',
						},
					],
					payment_methods_configs: [
						{
							type: 'credit_card',
							brands: ['MASTERCARD', 'VISA'],
							config_options: [{ option: 'installments_limit', value: '12' }], // define o número máximo de parcelas para o pagamento.
						},
					],
					soft_descriptor: 'CasamentoFab&Manu',
					redirect_url: `${env.PAGBANK_EVENT_URL}/confirmacao-pedido/${orderId}`,
					return_url: `${env.PAGBANK_EVENT_URL}/`,
					notification_urls: [`${env.PAGBANK_EVENT_URL}/api/checkout/webhooks/checkout`],
					payment_notification_urls: [`${env.PAGBANK_EVENT_URL}/api/checkout/webhooks/transactional`],
				},
			})
			.json<IPagBankCreateCheckoutResponse>();

		console.log('pagBankResponse: ', pagBankResponse);

		const paymentLink = pagBankResponse.links.find((link) => link.rel === 'PAY');
		const inactiveLink = pagBankResponse.links.find((link) => link.rel === 'INACTIVATE');
		const selfLink = pagBankResponse.links.find((link) => link.rel === 'SELF');

		const order = await prisma.order.create({
			data: {
				id: orderId,
				checkoutId: pagBankResponse.id,
				referenceId: pagBankResponse.reference_id,
				status: 'IN_ANALYSIS',
			},
		});

		const orderProducts = pagBankResponse.items.map((item) => {
			return {
				itemReferenceId: item.reference_id,
				itemName: item.name,
				itemQuantity: item.quantity,
				productId: item.reference_id,
				orderId: order.id,
				price: item.unit_amount / 100,
			};
		});

		await prisma.orderProduct.createMany({
			data: orderProducts,
		});

		if (name && message) {
			await prisma.message.create({
				data: {
					from: name,
					messageText: message,
				},
			});
		}

		return Response.json(
			{
				payment_link: paymentLink?.href,
				inactive_link: inactiveLink?.href,
				self_link: selfLink?.href,
				order,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.log('create checkout route error: ', error);

		if (error instanceof HTTPError) {
			const errorJson = await error.response.json<{ message: string }>();
			console.log('checkout ky error: ', errorJson);
		}

		return NextResponse.json({ message: 'Erro ao tentar gerar pedido.' }, { status: 400 });
	}
}
