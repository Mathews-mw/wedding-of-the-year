import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const sort = z.enum(['asc', 'desc', 'lowest', 'biggest']).nullish().default('asc').parse(searchParams.get('sort'));

	try {
		let query: Prisma.ProductFindManyArgs;

		switch (sort) {
			case 'desc':
				query = {
					orderBy: {
						title: 'desc',
					},
				};
				break;
			case 'biggest':
				query = {
					orderBy: {
						price: 'desc',
					},
				};
				break;
			case 'lowest':
				query = {
					orderBy: {
						price: 'asc',
					},
				};
				break;
			default:
				query = {
					orderBy: {
						title: 'asc',
					},
				};
				break;
		}

		const gifts = await prisma.product.findMany({
			orderBy: query.orderBy,
		});

		return Response.json(gifts);
	} catch (error) {
		console.log('gift route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
