'use client';

import { Button } from '@/components/ui/button';
import { EmptyCartModal } from './dialogs/empty-cart-dialog';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProductItem } from './product-item';
import { mockProductList } from '@/data/mock-products-list';
import { twMerge } from 'tailwind-merge';
import { useQuery } from '@tanstack/react-query';
import { listingProducts } from '@/app/api/@requests/listing-products';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductList() {
	const order = [];
	const router = useRouter();

	const { data: products } = useQuery({
		queryKey: ['products'],
		queryFn: async () => listingProducts({ sort: 'asc' }),
	});

	return (
		<div className="mt-8 space-y-4 px-2">
			<div className="w-full space-y-4 lg:flex lg:justify-between">
				{order.length <= 0 ? (
					<EmptyCartModal />
				) : (
					<Button onClick={() => router.push('/pedido')}>
						<ShoppingCart className="size" />
						{order.length === 1 ? `Ver carrinho (1 presente)` : `Ver carrinho (${order.length} presentes)`}
					</Button>
				)}

				{/* <div className="lg:flex lg:gap-4">
					<label htmlFor="list-order" className="font-semibold text-nowrap">
						Ordenar a lista
					</label>
					<Select
						placeholder="Selecione um valor"
						defaultValue="asc"
						value={sortListValue}
						onValueChange={(value) => setSortListValue(value)}
					>
						<SelectItem value="asc" text="A-Z" />
						<SelectItem value="desc" text="Z-A" />
						<SelectItem value="lowest" text="Menor preço" />
						<SelectItem value="biggest" text="Maior preço" />
					</Select>
				</div> */}
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
	);
}
