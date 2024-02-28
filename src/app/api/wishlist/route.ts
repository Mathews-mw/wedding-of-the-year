import { ZodError, z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

const bodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	giftsIds: z.array(z.string()),
});

export async function POST(request: NextRequest) {
	const data = await request.json();

	const dataParse = bodySchema.safeParse(data);

	if (!dataParse.success) {
		return NextResponse.json(
			{
				message:
					'Erro ao preencher formulário. Por favor, verifique os dados e tente novamente.',
				error: dataParse.error.issues,
			},
			{ status: 400 }
		);
	}

	const { name, email, giftsIds } = dataParse.data;

	try {
		const wishlistAlreadyExist = await prisma.wishlistOwner.findUnique({
			where: {
				email,
			},
		});

		if (wishlistAlreadyExist) {
			return NextResponse.json(
				{
					message: `Ops! Parece que já existe uma lista de desejos cadastrada com o e-mail "${email}".`,
				},
				{ status: 400 }
			);
		}

		const wishlist = await prisma.wishlistOwner.create({
			data: {
				name,
				email,
			},
		});

		const wishlistGifts = giftsIds.map((gift) => {
			return {
				wishlistOwnerId: wishlist.id,
				giftId: gift,
			};
		});

		await prisma.wishlistGifts.createMany({
			data: wishlistGifts,
		});

		return Response.json({
			message: 'Lista de desejos criada com sucesso.',
			wishlistId: wishlist.id,
			guest: wishlist.name,
		});
	} catch (error) {
		console.log('wishlist route error: ', error);

		return new Response('Erro ao tentar criar lista de desejos.', {
			status: 400,
		});
	}
}
