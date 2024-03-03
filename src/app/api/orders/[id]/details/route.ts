import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface IParamsProps {
	params: {
		id: string;
	};
}

export async function GET(request: NextRequest, { params }: IParamsProps) {
	const id = z.string().parse(params.id);

	try {
		const orderDetails = await prisma.order.findUnique({
			include: {
				orderProducts: {
					include: {
						gift: true,
					},
				},
			},
			where: {
				id,
			},
		});

		if (!orderDetails) {
			return NextResponse.json({ message: 'Pedido não encontrado' }, { status: 404 });
		}

		return Response.json(orderDetails);
	} catch (error) {
		console.log('order details route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
