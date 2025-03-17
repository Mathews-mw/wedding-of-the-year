'use client';

import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { listingOrders } from '@/app/api/@requests/listing-orders';

import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { Pagination } from '@/components/pagination';
import { OrderTableRow } from '../order-table/order-table-row';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { OrderTableFilters } from '../order-table/order-table-filters';
import { OrderTableSkeleton } from '../order-table/order-table-skeleton';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

import { SlidersHorizontal } from 'lucide-react';

export function ReportTabContent() {
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();
	const { replace } = useRouter();

	const status = searchParams.get('status') ?? undefined;
	const customerName = searchParams.get('customerName') ?? undefined;
	const currentPage = z.coerce.number().parse(searchParams.get('page') ?? '1');
	const perPage = z.coerce.number().parse(searchParams.get('perPage') ?? '10');

	const { data: ordersResponse, isLoading: isLoadingOrders } = useQuery({
		queryKey: ['orders', currentPage, perPage, customerName, status],
		queryFn: async () =>
			await listingOrders({
				page: currentPage,
				perPage,
				customerName,
				status: status === 'all' ? undefined : status,
			}),
	});

	function handlePaginate(page: number) {
		params.set('page', page.toString());
		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<TabsContent value="report" className="mt-8">
			<div className="space-y-2.5">
				<div className="hidden lg:block">
					<OrderTableFilters />
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

						<OrderTableFilters />
					</DrawerContent>
				</Drawer>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[64px]"></TableHead>
								<TableHead className="w-[280px]">Identificador</TableHead>
								<TableHead className="w-[140px]">Realizado há</TableHead>
								<TableHead>Cliente</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{isLoadingOrders && <OrderTableSkeleton />}

							{ordersResponse &&
								ordersResponse?.orders.map((order) => {
									return <OrderTableRow key={order.id} order={order} />;
								})}
						</TableBody>
					</Table>
				</div>

				{ordersResponse && (
					<Pagination
						currentPage={ordersResponse.pagination.page}
						perPage={ordersResponse.pagination.per_page}
						totalCount={ordersResponse.pagination.totalOccurrences}
						totalPages={ordersResponse.pagination.totalPages}
						onPageChange={(page) => handlePaginate(page)}
					/>
				)}
			</div>
		</TabsContent>
	);
}
