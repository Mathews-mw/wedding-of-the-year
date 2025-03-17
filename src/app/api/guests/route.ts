import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;

	const queryParamsSchema = z.object({
		page: z.coerce.number().optional().default(1),
		per_page: z.coerce.number().optional().default(10),
		name: z.optional(z.string()),
	});

	const { page, per_page, name } = queryParamsSchema.parse({
		page: searchParams.get('page'),
		per_page: searchParams.get('per_page'),
		name: searchParams.get('name'),
	});

	try {
		const query: Prisma.GuestFindManyArgs = {
			where: {
				name: {
					contains: name,
					mode: 'insensitive',
				},
			},
		};

		const [guests, count] = await prisma.$transaction([
			prisma.guest.findMany({
				where: query.where,
				orderBy: {
					name: 'asc',
				},
				take: per_page,
				skip: (page - 1) * per_page,
			}),
			prisma.guest.count({
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
			guests,
		});
	} catch (error) {
		console.log('get many guests route error: ', error);
		return new Response(JSON.stringify(error), {
			status: 400,
		});
	}
}
