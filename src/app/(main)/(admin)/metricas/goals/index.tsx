import { CardGuests } from './card-guests';
import { CardRevenue } from './card-revenue';
import { CardProductsPurchased } from './card-products-purchased';

export function Goals() {
	return (
		<div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
			<CardProductsPurchased />
			<CardRevenue />
			<CardGuests />
		</div>
	);
}
