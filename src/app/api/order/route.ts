import { z } from 'zod';
import dayjs from 'dayjs';
import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/env';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { pagseguroAPI } from '@/lib/pagseguro/pagseguro-api';

interface IPagSeguroItem {
	reference_id: string;
	name: string;
	quantity: number;
	unit_amount: number;
}

interface IPagSeguroLink {
	rel: string;
	href: string;
	method: string;
}

const bodySchema = z.object({
	giftsIds: z.array(z.string()),
	name: z.optional(z.string()),
	message: z.optional(z.string()),
});

export async function POST(request: NextRequest, response: NextResponse) {
	const data = await request.json();
	const cookieStore = cookies();

	const { giftsIds, name, message } = bodySchema.parse(data);

	try {
		const gifts = await prisma.gift.findMany({
			where: {
				id: {
					in: giftsIds,
				},
			},
		});

		const checkoutItems = gifts.map((gift) => {
			return {
				reference_id: gift.id,
				name: gift.title,
				quantity: 1,
				unit_amount: gift.price * 100,
			};
		});

		const expirationDate = dayjs().add(1, 'day');

		const { data: pagSeguroResult } = await pagseguroAPI.post('/checkouts', {
			reference_id: randomUUID(),
			expiration_date: expirationDate.toDate(),
			customer_modifiable: true,
			items: checkoutItems,
			additional_amount: 0,
			discount_amount: 0,
			payment_methods: [
				{ type: 'credit_card', brands: ['mastercard', 'visa', 'elo'] },
				{ type: 'debit_card', brands: ['mastercard', 'visa', 'elo'] },
				{ type: 'BOLETO' },
			],
			payment_methods_configs: [
				{
					type: 'credit_card',
					brands: ['mastercard', 'visa', 'elo'],
					config_options: [{ option: 'installments_limit', value: '12' }], // define o número máximo de parcelas para o pagamento.
				},
			],
			soft_descriptor: 'Casamento Rod&Nai',
			redirect_url: `${env.PAGSEGURO_REDIRECT_URL}`,
			return_url: env.PAGSEGURO_RETURN_URL,
			notification_urls: [env.PAGSEGURO_NOTIFICATIONS_URL],
			payment_notification_urls: [env.PAGSEGURO_NOTIFICATIONS_URL],
		});

		const paymentLink: IPagSeguroLink = pagSeguroResult.links.find(
			(link: IPagSeguroLink) => link.rel === 'PAY'
		);
		const inactiveLink: IPagSeguroLink = pagSeguroResult.links.find(
			(link: IPagSeguroLink) => link.rel === 'INACTIVATE'
		);
		const selfLink: IPagSeguroLink = pagSeguroResult.links.find(
			(link: IPagSeguroLink) => link.rel === 'SELF'
		);

		const order = await prisma.order.create({
			data: {
				checkoutId: pagSeguroResult.id,
				referenceId: pagSeguroResult.reference_id,
				status: 'IN_ANALYSIS',
				linkSelf: selfLink.href,
				linkPay: paymentLink.href,
				linkInactive: inactiveLink.href,
			},
		});

		const orderProducts: Prisma.OrderProductsCreateManyInput = pagSeguroResult.items.map(
			(item: IPagSeguroItem) => {
				return {
					itemReferenceId: item.reference_id,
					itemName: item.name,
					itemQuantity: item.quantity,
					giftId: item.reference_id,
					orderId: order.id,
				};
			}
		);

		await prisma.orderProducts.createMany({
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

		cookieStore.set('@WEDDING_N&R_CHECKOUT_ID', pagSeguroResult.id, {
			httpOnly: false,
			path: '/',
			maxAge: 60 * 60 * 24,
		});
		cookieStore.set('@WEDDING_N&R_ORDER_ID', order.id, {
			httpOnly: false,
			path: '/',
			maxAge: 60 * 60 * 24,
		});

		return Response.json({
			message: 'Pedido criado com sucesso.',
			payment_link: paymentLink.href,
		});
	} catch (error) {
		console.log('order route error: ', error);

		if (error instanceof AxiosError) {
			console.log('order route axios error: ', error.response?.data);
		}

		return new Response('Erro ao tentar criar pedido.', {
			status: 400,
		});
	}
}
