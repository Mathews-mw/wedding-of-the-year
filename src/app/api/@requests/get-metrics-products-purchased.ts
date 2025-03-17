import { HTTPError } from 'ky';

import { api } from '@/lib/api-client';
import { ApiExceptionsError } from './error-handler/api-exceptions-error';

export interface IMetricsGiftsPurchasedResponse {
	total_products: number;
	total_purchased: number;
	total_remaining: number;
}

export async function getMetricsProductsPurchased(): Promise<IMetricsGiftsPurchasedResponse> {
	try {
		const response = await api.get('metrics/products-purchased').json<IMetricsGiftsPurchasedResponse>();

		return response;
	} catch (error) {
		if (error instanceof HTTPError) {
			throw new ApiExceptionsError();
		}

		throw error;
	}
}
