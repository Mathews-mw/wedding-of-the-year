import { useQuery } from '@tanstack/react-query';

import { listingGuests } from '@/app/api/@requests/listing-guests';

import { Skeleton } from '@/components/ui/skeleton';

import { Users } from 'lucide-react';

export function CardGuests() {
	const { data: response } = useQuery({
		queryKey: ['metrics-guests'],
		queryFn: async () => {
			const guests = await listingGuests({
				page: 1,
				perPage: 9999,
				name: '',
			});

			return guests;
		},
	});

	return (
		<div className="space-y-2.5 rounded-lg border p-4 shadow-sm">
			<div className="flex items-center gap-2">
				<Users className="size-6 text-rose-400" />
				<span className="text-xl font-semibold">Presenças</span>
			</div>

			<div>
				<div className="flex h-12 w-full flex-row items-baseline gap-2">
					{response ? (
						<span className="text-5xl font-bold tracking-tight">{response.pagination.totalOccurrences}</span>
					) : (
						<Skeleton className="h-12 w-16" />
					)}
					<span>Convidados</span>
				</div>
			</div>
		</div>
	);
}
