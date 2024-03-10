import { create } from 'zustand';

import { api } from '@/lib/axios';
import { IGift } from '@/data/gift-list';
import { IGetOrderDetailsResponse } from '@/app/api/@requests/get-order-details';
import { canceledOrders } from '@/app/api/@requests/canceled-order';

interface ILoadingExistingOrderRequest {
	orderId: string;
	checkoutId: string;
}

export interface IStoreState {
	MAXIMUM_WISHLIST_SIZE: number;
	order: IGift[];
	wishlist: IGift[];
	addToOrder: (gift: IGift) => void;
	removeToOrder: (gift: IGift) => void;
	loadingExistingOrder: ({
		orderId,
		checkoutId,
	}: ILoadingExistingOrderRequest) => Promise<void>;
	addToWishlist: (gift: IGift) => void;
	removeToWishlist: (gift: IGift) => void;
}

export const useStore = create<IStoreState>((set, get) => {
	return {
		MAXIMUM_WISHLIST_SIZE: 3,

		order: [],
		wishlist: [],

		addToOrder: (gift: IGift) => {
			const { order } = get();
			const giftList = [gift, ...order];

			set({ order: giftList });
		},

		removeToOrder: (gift: IGift) => {
			const { order } = get();

			const withoutDeletedOne = order.filter((item) => item.id !== gift.id);

			set({ order: withoutDeletedOne });
		},

		loadingExistingOrder: async ({ orderId, checkoutId }: ILoadingExistingOrderRequest) => {
			const { data, status } = await api.get<IGetOrderDetailsResponse>(
				`/orders/${orderId}/details`
			);

			if (status === 200) {
				if (checkoutId === data.checkoutId && data.status === 'IN_ANALYSIS') {
					const existingOrder = data.orderProducts.map((item) => item.gift);

					set({ order: existingOrder });

					await canceledOrders(orderId);
				}
			}
		},

		addToWishlist: (gift: IGift) => {
			const { wishlist } = get();
			const giftList = [gift, ...wishlist];

			set({ wishlist: giftList });
		},

		removeToWishlist: (gift: IGift) => {
			const { wishlist } = get();

			const withoutDeletedOne = wishlist.filter((item) => item.id !== gift.id);

			set({ wishlist: withoutDeletedOne });
		},
	};
});
