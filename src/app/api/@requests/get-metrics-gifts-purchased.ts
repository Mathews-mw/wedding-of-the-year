import { api } from '@/lib/axios';

export interface IMetricsGiftsPurchasedResponse {
	totalGifts: number;
	totalPurchased: number;
	totalRemaining: number;
}

export async function getMetricsGiftsPurchased(): Promise<IMetricsGiftsPurchasedResponse> {
	const { data } = await api.get<IMetricsGiftsPurchasedResponse>('/metrics/gifts-purchased');

	return data;
}
