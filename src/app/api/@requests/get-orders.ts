import { api } from '@/lib/axios';
import { Order } from '@prisma/client';

export type OrderStatus =
	| 'AUTHORIZED'
	| 'PAID'
	| 'IN_ANALYSIS'
	| 'DECLINED'
	| 'CANCELED'
	| 'all'
	| undefined;

export interface IGetOrdersQuery {
	page?: number | null;
	perPage?: number | null;
	customerName?: string | null;
	status?: OrderStatus | null;
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

export async function getOrders({
	page,
	perPage,
	status,
	customerName,
}: IGetOrdersQuery): Promise<IGetOrdersResponse> {
	const { data } = await api.get<IGetOrdersResponse>('/orders', {
		params: {
			page,
			per_page: perPage,
			customer_name: customerName,
			status,
		},
	});

	return data;
}
