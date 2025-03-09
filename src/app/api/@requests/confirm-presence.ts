import { HTTPError } from 'ky';
import { Guest } from '@prisma/client';

import { api } from '@/lib/api-client';
import { ApiExceptionsError } from './error-handler/api-exceptions-error';

export interface IRequest {
	name: string;
	email: string;
	phone: string;
}

interface IResponse {
	message: string;
	guest: Guest;
}

export async function confirmPresence({ name, email, phone }: IRequest): Promise<IResponse> {
	try {
		const { guest, message } = await api
			.post('budgets/create-request', {
				json: {
					name,
					email,
					phone,
				},
			})
			.json<IResponse>();

		return {
			message,
			guest,
		};
	} catch (error) {
		if (error instanceof HTTPError) {
			const errorJson = await error.response.json<{ message: string }>();
			throw new ApiExceptionsError(errorJson.message);
		}

		throw error;
	}
}
