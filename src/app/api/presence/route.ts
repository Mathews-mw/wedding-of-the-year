import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

const bodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	phone: z.string(),
	family_members_amount: z.coerce.number(),
});

export async function POST(request: NextRequest) {
	if (request.method !== 'POST') {
		return new Response(null, {
			status: 405,
		});
	}
	const data = await request.json();

	const { name, email, phone, family_members_amount } = bodySchema.parse(data);

	try {
		const guest = await prisma.guest.findUnique({
			where: {
				email,
			},
		});

		if (guest) {
			return NextResponse.json(
				{ message: 'Ops! Parece que esse e-mail já consta na lista de presença.' },
				{ status: 400 }
			);
		}

		const result = await prisma.guest.create({
			data: {
				name,
				email,
				phone,
				familyMembersAmount: family_members_amount,
			},
		});

		return Response.json({ message: 'Presença confirmada com sucesso.', guest: result.name });
	} catch (error) {
		console.log('presence route error: ', error);
		return new Response('Erro ao tentar confirmar presença.', {
			status: 400,
		});
	}
}
