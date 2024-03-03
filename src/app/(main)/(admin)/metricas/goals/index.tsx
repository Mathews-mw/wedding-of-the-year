import { CardRevenue } from './card-revenue';
import { CardGiftsPurchased } from './card-gifts-purchased';

export function Goals() {
	return (
		<div className="grid grid-cols-metricsCards grid-rows-metricsCards gap-4">
			<CardGiftsPurchased />
			<CardRevenue />
		</div>
	);
}
