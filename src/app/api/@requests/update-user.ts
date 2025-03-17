import { HTTPError } from 'ky';

import { api } from '@/lib/api-client';
import { ApiExceptionsError } from './error-handler/api-exceptions-error';

export interface IRequest {
	userId: string;
	name: string;
}

export async function updateUser({ name, userId }: IRequest): Promise<void> {
	try {
		await api.put(`users/update/${userId}`, {
			json: {
				name,
			},
		});
	} catch (error) {
		if (error instanceof HTTPError) {
			const errorJson = await error.response.json<{ message: string }>();
			throw new ApiExceptionsError(errorJson.message);
		}

		throw error;
	}
}
