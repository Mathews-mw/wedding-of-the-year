import { api } from '@/lib/axios';
import { Gift, Order, OrderProducts } from '@prisma/client';

interface IOrderProductDetails extends OrderProducts {
	gift: Gift;
}

export interface IGetOrderDetailsResponse extends Order {
	orderProducts: IOrderProductDetails[];
}

export async function getOrderDetails(orderId: string): Promise<IGetOrderDetailsResponse> {
	const { data } = await api.get<IGetOrderDetailsResponse>(`/orders/${orderId}/details`);

	return data;
}
