import { api } from '@/lib/api-client';
import { Product } from '@prisma/client';

interface IRequest {
	productIds: Array<string>;
}

export async function listingProductsToSetupCheckout({ productIds }: IRequest): Promise<Array<Product>> {
	const paramsSerializer = productIds.map((item) => {
		return ['productIds', item];
	});

	const response = await api
		.get('products/listing-to-setup-checkout', {
			searchParams: paramsSerializer,
		})
		.json<Array<Product>>();

	return response;
}
