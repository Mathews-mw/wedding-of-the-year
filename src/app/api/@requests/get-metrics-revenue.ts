import { HTTPError } from 'ky';

import { api } from '@/lib/api-client';
import { ApiExceptionsError } from './error-handler/api-exceptions-error';

export interface IMetricsRevenueResponse {
	products_total_sum: number;
	purchases_total_sum: number;
}

export async function getMetricsRevenue(): Promise<IMetricsRevenueResponse> {
	try {
		const response = await api.get('metrics/revenue').json<IMetricsRevenueResponse>();

		return response;
	} catch (error) {
		if (error instanceof HTTPError) {
			throw new ApiExceptionsError();
		}

		throw error;
	}
}
