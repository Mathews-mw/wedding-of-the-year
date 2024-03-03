import { api } from '@/lib/axios';

export interface IMetricsRevenueResponse {
	giftsTotalSum: number;
	purchasesTotalSum: number;
}

export async function getMetricsRevenue(): Promise<IMetricsRevenueResponse> {
	const { data } = await api.get<IMetricsRevenueResponse>('/metrics/revenue');

	return data;
}
