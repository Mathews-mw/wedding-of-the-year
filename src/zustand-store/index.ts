import { IGift } from '@/data/gift-list';
import { create } from 'zustand';

export interface IStoreState {
	MAXIMUM_WISHLIST_SIZE: number;
	order: IGift[];
	wishlist: IGift[];
	addToOrder: (gift: IGift) => void;
	removeToOrder: (gift: IGift) => void;
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
