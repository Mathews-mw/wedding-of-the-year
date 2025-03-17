import { z } from 'zod';
import { compare, hash } from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

interface IParamsProps {
	params: {
		id: string;
	};
}

const bodySchema = z.object({
	current_password: z.string(),
	new_password: z.string(),
});

export async function PATCH(request: NextRequest, { params }: IParamsProps) {
	const data = await request.json();

	const id = z.string().parse(params.id);
	const dataParse = bodySchema.safeParse(data);

	if (!dataParse.success) {
		return NextResponse.json(
			{
				message: 'Erro ao preencher formulário. Por favor, verifique os dados e tente novamente.',
				error: dataParse.error.issues,
			},
			{ status: 400 }
		);
	}

	const { current_password, new_password } = dataParse.data;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!user) {
			return NextResponse.json({ message: `Usuário não encontrado."` }, { status: 404 });
		}

		const passwordMatch = await compare(current_password, user.password);

		if (!passwordMatch) {
			return NextResponse.json(
				{ message: 'A senha atual que você está informando não confere com a cadastrada.' },
				{ status: 400 }
			);
		}

		const hashNewPassword = await hash(new_password, 8);

		user.password = hashNewPassword;

		await prisma.user.update({
			data: user,
			where: {
				id: user.id,
			},
		});

		return Response.json(
			{
				message: 'Senha atualizada com sucesso',
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log('update user password route error: ', error);
		return NextResponse.json({ message: 'Erro durante  atualização de senha do usuário.' }, { status: 400 });
	}
}
