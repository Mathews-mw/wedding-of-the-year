import { api } from '@/lib/axios';

export async function canceledOrders(orderId: string): Promise<void> {
	const { data } = await api.patch(`/orders/${orderId}/canceled`);

	return data;
}
