'use client';

import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { listingProductsPaginated } from '@/app/api/@requests/listing-products-paginated';

import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { Pagination } from '@/components/pagination';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

import { SlidersHorizontal } from 'lucide-react';
import { ProductTableFilters } from '../products-table-row/product-table-filters';
import { ProductTableSkeleton } from '../products-table-row/product-table-skeleton';
import { ProductTableRow } from '../products-table-row/product-table-row';

export function ProductsTabContent() {
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();
	const { replace } = useRouter();

	const name = searchParams.get('name') ?? '';
	const currentPage = z.coerce.number().parse(searchParams.get('page') ?? '1');
	const perPage = z.coerce.number().parse(searchParams.get('perPage') ?? '10');

	const { data: productsResponse, isLoading: isLoadingProducts } = useQuery({
		queryKey: ['metrics-products', currentPage, perPage, name],
		queryFn: async () =>
			await listingProductsPaginated({
				page: currentPage,
				perPage,
				name,
			}),
	});

	function handlePaginate(page: number) {
		params.set('page', page.toString());
		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<TabsContent value="products" className="mt-8">
			<div className="space-y-2.5">
				<div className="hidden lg:block">
					<ProductTableFilters />
				</div>

				<Drawer modal>
					<DrawerTrigger asChild className="lg:hidden">
						<Button variant="outline" size="sm">
							<SlidersHorizontal className="text-muted-foreground size-4" />
							Filtros
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<VisuallyHidden>
								<DrawerTitle>Filtros</DrawerTitle>
							</VisuallyHidden>
						</DrawerHeader>

						<ProductTableFilters />
					</DrawerContent>
				</Drawer>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Produto</TableHead>
								<TableHead>Preço</TableHead>
								<TableHead className="text-center">Quantidade</TableHead>
								<TableHead className="text-center">Disponível</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{isLoadingProducts && <ProductTableSkeleton />}

							{productsResponse &&
								productsResponse?.products.map((product) => {
									return <ProductTableRow key={product.id} product={product} />;
								})}
						</TableBody>
					</Table>
				</div>

				{productsResponse && (
					<Pagination
						currentPage={productsResponse.pagination.page}
						perPage={productsResponse.pagination.per_page}
						totalCount={productsResponse.pagination.totalOccurrences}
						totalPages={productsResponse.pagination.totalPages}
						onPageChange={(page) => handlePaginate(page)}
					/>
				)}
			</div>
		</TabsContent>
	);
}
