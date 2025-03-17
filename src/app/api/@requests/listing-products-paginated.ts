import { api } from '@/lib/api-client';
import { Product } from '@prisma/client';
import { HTTPError, SearchParamsOption } from 'ky';
import { ApiExceptionsError } from './error-handler/api-exceptions-error';

export interface IGetProductsQuery {
	page?: number | null;
	perPage?: number | null;
	name?: string;
}

export interface IGetProductsResponse {
	pagination: {
		page: number;
		per_page: number;
		totalPages: number;
		totalOccurrences: number;
	};
	products: Product[];
}

export async function listingProductsPaginated({
	page,
	perPage,
	name,
}: IGetProductsQuery): Promise<IGetProductsResponse> {
	try {
		const params = {
			page,
			per_page: perPage,
			name,
		};

		// Remove undefined/null values
		const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

		const response = await api
			.get('products/paginated', {
				searchParams: cleanParams,
			})
			.json<IGetProductsResponse>();

		return response;
	} catch (error) {
		if (error instanceof HTTPError) {
			throw new ApiExceptionsError();
		}

		throw error;
	}
}
