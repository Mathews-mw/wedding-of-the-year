import { api } from '@/lib/api-client';
import { Order } from '@prisma/client';
import { HTTPError, SearchParamsOption } from 'ky';
import { ApiExceptionsError } from './error-handler/api-exceptions-error';

export type TOrderStatus =
	| 'AUTHORIZED'
	| 'PAID'
	| 'IN_ANALYSIS'
	| 'DECLINED'
	| 'CANCELED'
	| 'AWAITING'
	| 'CONFIRMED'
	| 'all'
	| undefined;

export interface IGetOrdersQuery {
	page?: number | null;
	perPage?: number | null;
	customerName?: string | null;
	status?: string;
}

export interface IGetOrdersResponse {
	pagination: {
		page: number;
		per_page: number;
		totalPages: number;
		totalOccurrences: number;
	};
	orders: Order[];
}

export async function listingOrders({
	page,
	perPage,
	status,
	customerName,
}: IGetOrdersQuery): Promise<IGetOrdersResponse> {
	try {
		const params = {
			page,
			per_page: perPage,
			status,
			customer_name: customerName,
		};

		// Remove undefined/null values
		const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

		const response = await api
			.get('orders', {
				searchParams: cleanParams,
			})
			.json<IGetOrdersResponse>();

		return response;
	} catch (error) {
		if (error instanceof HTTPError) {
			throw new ApiExceptionsError();
		}

		throw error;
	}
}
