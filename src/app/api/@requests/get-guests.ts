import { api } from '@/lib/axios';
import { Guest } from '@prisma/client';

export interface IGetGuestsQuery {
	page?: number | null;
	perPage?: number | null;
	name?: string;
}

export interface IGetGuestsResponse {
	pagination: {
		page: number;
		per_page: number;
		totalPages: number;
		totalOccurrences: number;
	};
	guests: Guest[];
}

export async function getGuests({
	page,
	perPage,
	name,
}: IGetGuestsQuery): Promise<IGetGuestsResponse> {
	console.log('page: ', page);
	console.log('per_page: ', perPage);
	console.log('name: ', name);

	const { data } = await api.get('/guests', {
		params: {
			page,
			per_page: perPage,
			name,
		},
	});

	return data;
}
