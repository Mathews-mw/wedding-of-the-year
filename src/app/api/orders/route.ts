import { z } from 'zod';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const queryParamsSchema = z.object({
		page: z.coerce.number().optional().default(1),
		per_page: z.coerce.number().optional().default(10),
		customer_name: z.string().nullish(),
		status: z.enum(['AUTHORIZED', 'PAID', 'IN_ANALYSIS', 'DECLINED', 'CANCELED', 'AWAITING', 'CONFIRMED']).nullish(),
	});

	const { page, per_page, customer_name, status } = queryParamsSchema.parse({
		page: searchParams.get('page'),
		per_page: searchParams.get('per_page'),
		status: searchParams.get('status'),
		customer_name: searchParams.get('customer_name'),
	});

	try {
		const query: Prisma.OrderFindManyArgs = {
			where: {
				customerName: {
					contains: customer_name ?? undefined,
					mode: 'insensitive',
				},
				status: status ?? undefined,
			},
		};

		const [orders, count] = await prisma.$transaction([
			prisma.order.findMany({
				where: query.where,
				orderBy: {
					createdAt: 'desc',
				},
				take: per_page,
				skip: (page - 1) * per_page,
			}),
			prisma.order.count({
				where: query.where,
			}),
		]);

		const totalPages = Math.ceil(count / per_page);

		const pagination = {
			page,
			per_page,
			totalPages,
			totalOccurrences: count,
		};

		return Response.json({
			pagination,
			orders,
		});
	} catch (error) {
		console.log('orders route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
