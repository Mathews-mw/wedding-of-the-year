import { z } from 'zod';
import dayjs from 'dayjs';
import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { pagseguroAPI } from '@/lib/pagseguro/pagseguro-api';

interface IPagSeguroItem {
	reference_id: string;
	name: string;
	quantity: number;
	unit_amount: number;
}

interface IPagSeguroLink {
	rel: string;
	href: string;
	method: string;
}

const bodySchema = z.object({
	giftsIds: z.array(z.string()),
	name: z.optional(z.string()),
	message: z.optional(z.string()),
});

export async function POST(request: NextRequest) {
	// if (request.method !== 'POST') {
	// 	return new Response(null, {
	// 		status: 405,
	// 	});
	// }
	const data = await request.json();

	try {
		console.log('checkout notification: ', data);

		return Response.json({
			message: 'ok.',
		});
	} catch (error) {
		console.log('order route error: ', error);
		return new Response('Erro ao tentar criar pedido.', {
			status: 400,
		});
	}
}
