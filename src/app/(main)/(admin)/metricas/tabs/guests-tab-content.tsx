'use client';

import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { listingGuests } from '@/app/api/@requests/listing-guests';

import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { Pagination } from '@/components/pagination';
import { GuestTableRow } from '../guests-table/guest-table-row';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { GuestTableFilters } from '../guests-table/guest-table-filters';
import { GuestTableSkeleton } from '../guests-table/guest-table-skeleton';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

import { SlidersHorizontal } from 'lucide-react';

export function GuestsTabContent() {
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const pathname = usePathname();
	const { replace } = useRouter();

	const name = searchParams.get('name') ?? '';
	const currentPage = z.coerce.number().parse(searchParams.get('page') ?? '1');
	const perPage = z.coerce.number().parse(searchParams.get('perPage') ?? '10');

	const { data: guestsResponse, isLoading: isLoadingGuests } = useQuery({
		queryKey: ['guests', currentPage, perPage, name],
		queryFn: async () =>
			await listingGuests({
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
		<TabsContent value="guests" className="mt-8">
			<div className="space-y-2.5">
				<div className="hidden lg:block">
					<GuestTableFilters />
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

						<GuestTableFilters />
					</DrawerContent>
				</Drawer>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Nome</TableHead>
								<TableHead>E-mail</TableHead>
								<TableHead>Telefone</TableHead>
								<TableHead>Confirmado há</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{isLoadingGuests && <GuestTableSkeleton />}

							{guestsResponse &&
								guestsResponse?.guests.map((guest) => {
									return <GuestTableRow key={guest.id} guest={guest} />;
								})}
						</TableBody>
					</Table>
				</div>

				{guestsResponse && (
					<Pagination
						currentPage={guestsResponse.pagination.page}
						perPage={guestsResponse.pagination.per_page}
						totalCount={guestsResponse.pagination.totalOccurrences}
						totalPages={guestsResponse.pagination.totalPages}
						onPageChange={(page) => handlePaginate(page)}
					/>
				)}
			</div>
		</TabsContent>
	);
}
