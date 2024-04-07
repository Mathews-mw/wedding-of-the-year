import { CardRevenue } from './card-revenue';
import { CardGiftsPurchased } from './card-gifts-purchased';
import { CardGuests } from './card-guests';

export function Goals() {
	return (
		<div className="grid grid-cols-metricsCards grid-rows-metricsCards gap-4">
			<CardGiftsPurchased />
			<CardRevenue />
			<CardGuests />
		</div>
	);
}
