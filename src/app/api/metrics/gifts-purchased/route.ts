import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const totalGifts = await prisma.gift.count();

		const totalPurchased = await prisma.gift.count({
			where: {
				available: false,
			},
		});

		const totalRemaining = await prisma.gift.count({
			where: {
				available: true,
			},
		});

		return Response.json({
			totalGifts,
			totalPurchased,
			totalRemaining,
		});
	} catch (error) {
		console.log('metrics gifts purchased route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
