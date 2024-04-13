import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const giftsTotalSum = await prisma.gift.aggregate({
			_sum: {
				price: true,
			},
		});

		const totalProductsPurchased = await prisma.orderProducts.findMany({
			where: {
				order: {
					status: 'PAID',
				},
			},
			select: {
				gift: {
					select: {
						price: true,
					},
				},
			},
		});

		const purchasesTotalSum = totalProductsPurchased.reduce((amount, item) => {
			return (amount += item.gift.price);
		}, 0);

		return Response.json({
			giftsTotalSum: giftsTotalSum._sum.price,
			purchasesTotalSum: Number(purchasesTotalSum.toFixed(2)),
		});
	} catch (error) {
		console.log('metrics gifts purchased route error: ', error);

		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
