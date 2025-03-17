import { HTTPError } from 'ky';

import { api } from '@/lib/api-client';
import { ApiExceptionsError } from './error-handler/api-exceptions-error';

export interface IRequest {
	userId: string;
	currentPassword: string;
	newPassword: string;
}

export async function updateUserPassword({ userId, newPassword, currentPassword }: IRequest): Promise<void> {
	try {
		await api.patch(`users/update/${userId}/password`, {
			json: {
				current_password: currentPassword,
				new_password: newPassword,
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
