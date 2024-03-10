import { z } from 'zod';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/env';
import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		id: string;
	};
}

export async function PATCH(request: NextRequest, { params }: IParamsProps) {
	const id = z.string().parse(params.id);
	const cookieStore = cookies();

	try {
		const order = await prisma.order.findUnique({
			where: {
				id,
			},
		});

		if (!order) {
			return NextResponse.json({ message: 'Pedido não encontrado' }, { status: 404 });
		}

		await axios.post(`${order.linkInactive}`, null, {
			headers: {
				Authorization: `Bearer ${env.PAGSEGURO_TOKEN}`,
			},
		});

		order.status = 'CANCELED';

		await prisma.order.update({
			data: order,
			where: {
				id,
			},
		});

		cookieStore.delete('@WEDDING_N&R_CHECKOUT_ID');
		cookieStore.delete('@WEDDING_N&R_ORDER_ID');

		return Response.json({ message: 'Ordem cancelada com sucesso.' });
	} catch (error) {
		console.log('canceled order route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
