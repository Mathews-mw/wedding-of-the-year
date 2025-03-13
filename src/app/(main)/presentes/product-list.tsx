'use client';

import { Button } from '@/components/ui/button';
import { EmptyCartModal } from './dialogs/empty-cart-dialog';
import { ShoppingCart } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProductItem } from './product-item';
import { twMerge } from 'tailwind-merge';
import { useQuery } from '@tanstack/react-query';
import { listingProducts } from '@/app/api/@requests/listing-products';
import { Skeleton } from '@/components/ui/skeleton';
import { OrderByFilter } from './order-by-filter';
import { useCart } from '@/context/cart-context';
import { useState } from 'react';
import { CartDialog } from './dialogs/cart-dialog';

export function ProductList() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [openDialog, setOpenDialog] = useState(false);

	const { items: cart } = useCart();

	const orderByParams = searchParams.get('orderBy') ?? 'az';

	const { data: products } = useQuery({
		queryKey: ['products', orderByParams],
		queryFn: async () => listingProducts({ orderBy: orderByParams }),
	});

	return (
		<>
			<div className="mt-8 space-y-4 px-2">
				<div className="w-full space-y-4 lg:flex lg:justify-between">
					{cart.length <= 0 ? (
						<EmptyCartModal />
					) : (
						<Button onClick={() => setOpenDialog(true)}>
							<ShoppingCart className="size" />
							{cart.length === 1 ? `Ver carrinho (1 presente)` : `Ver carrinho (${cart.length} presentes)`}
						</Button>
					)}

					<OrderByFilter />
				</div>

				<div
					className={twMerge([
						'flex flex-col items-center gap-4',
						'sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3',
					])}
				>
					{products ? (
						<>
							{products.map((product) => {
								return <ProductItem key={product.id} product={product} />;
							})}
						</>
					) : (
						<>
							<Skeleton className="h-[320px] w-[320px] rounded-[6px]" />
							<Skeleton className="h-[320px] w-[320px] rounded-[6px]" />
							<Skeleton className="h-[320px] w-[320px] rounded-[6px]" />
							<Skeleton className="h-[320px] w-[320px] rounded-[6px]" />
							<Skeleton className="h-[320px] w-[320px] rounded-[6px]" />
							<Skeleton className="h-[320px] w-[320px] rounded-[6px]" />
						</>
					)}
				</div>
			</div>

			<CartDialog isOpen={openDialog} onOpen={setOpenDialog} />
		</>
	);
}
