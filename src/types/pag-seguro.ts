export interface ICheckoutNotification {
	id: string;
	reference_id: string;
	created_at: string;
	customer: {
		name: string;
		email: string;
		tax_id: string;
		phones: Array<{
			country: string;
			area: string;
			number: string;
		}>;
	};
	items: Array<{
		reference_id: string;
		name: string;
		quantity: number;
		unit_amount: number;
	}>;
	charges: Array<{
		id: string;
		reference_id: string;
		status: string;
		created_at: string;
		paid_at: string;
		amount: {
			value: number;
			currency: string;
			summary: {
				total: number;
				paid: number;
				refunded: number;
			};
		};
		payment_response: {
			code: string;
			message: string;
			reference: string;
		};
		payment_method: {
			type: string;
			installments: number;
			capture: boolean;
			card: {
				brand: string;
				first_digits: string;
				last_digits: string;
				exp_month: string;
				exp_year: string;
				holder: {
					name: string;
				};
			};
		};
		links: Array<{
			rel: string;
			href: string;
			media: string;
			type: string;
		}>;
	}>;
	notification_urls: Array<string>;
	links: Array<{
		rel: string;
		href: string;
		media: string;
		type: string;
	}>;
}
