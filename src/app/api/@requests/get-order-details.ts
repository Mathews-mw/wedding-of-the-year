import { Product } from '@prisma/client';
import { HTTPError, SearchParamsOption } from 'ky';

import { api } from '@/lib/api-client';
import { ApiExceptionsError } from './error-handler/api-exceptions-error';

export interface IParams {
	orderId: string;
}

export async function getOrderDetails({ orderId }: IParams): Promise<Product[]> {
	try {
		const response = await api.get(`orders/${orderId}/details`).json<Product[]>();

		return response;
	} catch (error) {
		if (error instanceof HTTPError) {
			throw new ApiExceptionsError();
		}

		throw error;
	}
}
