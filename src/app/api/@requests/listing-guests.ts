import { api } from '@/lib/api-client';
import { Guest } from '@prisma/client';
import { HTTPError, SearchParamsOption } from 'ky';
import { ApiExceptionsError } from './error-handler/api-exceptions-error';

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

export async function listingGuests({ page, perPage, name }: IGetGuestsQuery): Promise<IGetGuestsResponse> {
	try {
		const params = {
			page,
			per_page: perPage,
			name,
		};

		// Remove undefined/null values
		const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

		const response = await api
			.get('guests', {
				searchParams: cleanParams,
			})
			.json<IGetGuestsResponse>();

		return response;
	} catch (error) {
		if (error instanceof HTTPError) {
			throw new ApiExceptionsError();
		}

		throw error;
	}
}
