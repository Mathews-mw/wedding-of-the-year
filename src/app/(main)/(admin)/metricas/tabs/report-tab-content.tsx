'use client';

import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { TabsContent } from '@/components/ui/tabs';
import { Pagination } from '@/components/pagination';
import { OrderTableRow } from '../order-table/order-table-row';
import { OrderTableFilters } from '../order-table/order-table-filters';
import { OrderStatus, getOrders } from '@/app/api/@requests/get-orders';
import { OrderTableSkeleton } from '../order-table/order-table-skeleton';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function ReportTabContent() {
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();
	const { replace } = useRouter();

	const status = searchParams.get('status') as OrderStatus;
	const customerName = searchParams.get('customerName') ?? undefined;
	const currentPage = z.coerce.number().parse(searchParams.get('page') ?? '1');
	const perPage = z.coerce.number().parse(searchParams.get('perPage') ?? '10');

	const { data: ordersResponse, isLoading: isLoadingOrders } = useQuery({
		queryKey: ['orders', currentPage, perPage, customerName, status],
		queryFn: async () =>
			await getOrders({
				page: currentPage,
				perPage,
				customerName,
				status: status === 'all' ? undefined : status,
			}),
		staleTime: 1000 * 60 * 2, // 2 minutes
	});

	function handlePaginate(page: number) {
		params.set('page', page.toString());
		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<TabsContent value="report" className="mt-8">
			<div className="space-y-2.5">
				<OrderTableFilters />

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[64px]"></TableHead>
								<TableHead className="w-[320px]">Identificador</TableHead>
								<TableHead className="w-[180px]">Realizado há</TableHead>
								<TableHead className="w-[140px]">Status</TableHead>
								<TableHead>Cliente</TableHead>
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
