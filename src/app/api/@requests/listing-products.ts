import { Product } from '@prisma/client';
import { HTTPError, SearchParamsOption } from 'ky';

import { api } from '@/lib/api-client';
import { ApiExceptionsError } from './error-handler/api-exceptions-error';

export interface IParams {
	orderBy: string;
}

export async function listingProducts({ orderBy }: IParams): Promise<Product[]> {
	try {
		const params = {
			orderBy,
		};

		// Remove undefined/null values
		const cleanParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null)) as SearchParamsOption;

		const response = await api
			.get('products', {
				searchParams: {
					orderBy,
				},
			})
			.json<Product[]>();

		return response;
	} catch (error) {
		if (error instanceof HTTPError) {
			throw new ApiExceptionsError();
		}

		throw error;
	}
}
