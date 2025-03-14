import { Product } from '@prisma/client';
import { HTTPError, SearchParamsOption } from 'ky';

import { api } from '@/lib/api-client';
import { ApiExceptionsError } from './error-handler/api-exceptions-error';
import { IOrderDetails } from '@/@types/order';

export interface IParams {
	orderId: string;
}

export async function getOrderDetails({ orderId }: IParams): Promise<IOrderDetails> {
	try {
		const response = await api.get(`orders/${orderId}/details`).json<IOrderDetails>();

		return response;
	} catch (error) {
		if (error instanceof HTTPError) {
			throw new ApiExceptionsError();
		}

		throw error;
	}
}
