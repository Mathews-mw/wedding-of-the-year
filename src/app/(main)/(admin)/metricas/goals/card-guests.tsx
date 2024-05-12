import { useQuery } from '@tanstack/react-query';

import { MetricCardSkeleton } from './metric-card-skeleton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { Users } from 'lucide-react';
import { getGuests } from '@/app/api/@requests/get-guests';
import Skeleton from 'react-loading-skeleton';

export function CardGuests() {
	const { data: response } = useQuery({
		queryKey: ['metrics-guests'],
		queryFn: async () => {
			const guests = await getGuests({
				page: 1,
				perPage: 9999,
				name: '',
			});

			return guests;
		},
		staleTime: 1000 * 60 * 2, // 2 minutes
	});

	return (
		<Card className="text-slate-600">
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-xl font-semibold">Presenças</CardTitle>
				<Users className="h-5 w-5 text-rose-400" />
			</CardHeader>

			<CardContent>
				<div className="flex h-12 w-full flex-row items-baseline gap-2">
					{response ? (
						<span className="text-5xl font-bold tracking-tight">
							{response.pagination.totalOccurrences}
						</span>
					) : (
						<Skeleton className="h-12 w-16" />
					)}
					<span>Convidados</span>
				</div>
			</CardContent>
		</Card>
	);
}
