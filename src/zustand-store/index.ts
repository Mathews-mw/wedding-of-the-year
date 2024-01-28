import { IGift } from '@/data/gift-list';
import { create } from 'zustand';

export interface IStoreState {
	order: IGift[];
	addToOrder: (gift: IGift) => void;
	removeToOrder: (gift: IGift) => void;
}

export const useStore = create<IStoreState>((set, get) => {
	return {
		order: [],
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
	};
});
