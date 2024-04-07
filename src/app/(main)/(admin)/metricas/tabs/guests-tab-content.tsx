'use client';

import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { TabsContent } from '@/components/ui/tabs';
import { Pagination } from '@/components/pagination';
import { getGuests } from '@/app/api/@requests/get-guests';
import { GuestTableRow } from '../guests-table/guest-table-row';
import { GuestTableFilters } from '../guests-table/guest-table-filters';
import { GuestTableSkeleton } from '../guests-table/guest-table-skeleton';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
			await getGuests({
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
		<TabsContent value="report" className="mt-8">
			<span>testando</span>
			<div className="space-y-2.5">
				<GuestTableFilters />

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[64px]">Nome</TableHead>
								<TableHead className="w-[320px]">E-mail</TableHead>
								<TableHead className="w-[180px]">Telefone</TableHead>
								<TableHead className="w-[140px]">Agregados</TableHead>
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
