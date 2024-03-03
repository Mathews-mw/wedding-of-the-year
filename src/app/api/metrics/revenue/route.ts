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

		const orderProducts = await prisma.orderProducts.findMany({
			include: {
				gift: true,
			},
		});

		const totalPurchases = orderProducts.map((item) => item.gift);
		const purchasesTotalSum = totalPurchases.reduce((amount, item) => {
			return (amount += item.price);
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
