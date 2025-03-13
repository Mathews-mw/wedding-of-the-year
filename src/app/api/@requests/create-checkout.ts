import { HTTPError } from 'ky';
import { Guest, Order } from '@prisma/client';

import { api } from '@/lib/api-client';
import { ApiExceptionsError } from './error-handler/api-exceptions-error';

export interface IRequest {
	productIds: Array<string>;
	name?: string;
	message?: string;
}

interface IResponse {
	payment_link: string;
	inactive_link: string;
	self_link: string;
	order: Order;
}

export async function createCheckout({ productIds, name, message }: IRequest): Promise<IResponse> {
	try {
		const response = await api
			.post('checkout/create', {
				json: {
					productIds,
					name,
					message,
				},
			})
			.json<IResponse>();

		return response;
	} catch (error) {
		if (error instanceof HTTPError) {
			const errorJson = await error.response.json<{ message: string }>();
			throw new ApiExceptionsError(errorJson.message);
		}

		throw error;
	}
}
