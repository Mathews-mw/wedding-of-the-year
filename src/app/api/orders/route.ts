import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const queryParamsSchema = z.object({
		page: z.coerce.number().optional().default(1),
		per_page: z.coerce.number().optional().default(10),
		customer_name: z.string().nullish(),
		status: z.enum(['AUTHORIZED', 'PAID', 'IN_ANALYSIS', 'DECLINED', 'CANCELED']).nullish(),
	});

	const { page, per_page, customer_name, status } = queryParamsSchema.parse({
		page: searchParams.get('page'),
		per_page: searchParams.get('per_page'),
		customer_name: searchParams.get('customer_name'),
		status: searchParams.get('status'),
	});

	try {
		const query: Prisma.OrderFindManyArgs = {
			where: {
				customerName: {
					contains: customer_name ?? undefined,
					mode: 'insensitive',
				},
				AND: {
					status: status ?? undefined,
				},
			},
		};

		const [orders, count] = await prisma.$transaction([
			prisma.order.findMany({
				where: query.where,
				orderBy: {
					created_at: 'desc',
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
