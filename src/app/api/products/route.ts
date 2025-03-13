import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const orderBy = z
		.enum(['az', 'za', 'lowestPrice', 'highPrice'])
		.nullish()
		.default('az')
		.parse(searchParams.get('orderBy'));

	try {
		let query: Prisma.ProductFindManyArgs;

		switch (orderBy) {
			case 'az':
				query = {
					orderBy: {
						title: 'asc',
					},
				};
				break;
			case 'za':
				query = {
					orderBy: {
						title: 'desc',
					},
				};
				break;
			case 'highPrice':
				query = {
					orderBy: {
						price: 'desc',
					},
				};
				break;
			case 'lowestPrice':
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

		const products = await prisma.product.findMany({
			orderBy: query.orderBy,
		});

		return Response.json(products);
	} catch (error) {
		console.log('products route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
