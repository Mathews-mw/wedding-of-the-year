import { useQuery } from '@tanstack/react-query';

import { MetricCardSkeleton } from './metric-card-skeleton';
import { getMetricsRevenue } from '@/app/api/@requests/get-metrics-revenue';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

import { DollarSign } from 'lucide-react';

export function CardRevenue() {
	const { data: response } = useQuery({
		queryKey: ['metrics-revenue'],
		queryFn: getMetricsRevenue,
		staleTime: 1000 * 60 * 2, // 2 minutes
	});

	const metricPercent = response
		? Math.ceil((response.purchasesTotalSum / response.giftsTotalSum) * 100)
		: 0;

	return (
		<Card className="text-slate-600">
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-xl font-semibold">Arrecadação</CardTitle>
				<DollarSign className="h-5 w-5 text-emerald-500" />
			</CardHeader>

			{response ? (
				<>
					<CardContent className="space-y-1">
						<div>
							<span className="text-5xl font-bold tracking-tight">
								{response.purchasesTotalSum.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</span>
							<span className="font-semibold tracking-tight">
								{' '}
								/ de{' '}
								{response.giftsTotalSum.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</span>
						</div>
					</CardContent>

					<CardFooter>
						<p className="text-base text-muted-foreground">
							{metricPercent <= 40 ? (
								<span className="font-bold text-rose-400">{metricPercent}</span>
							) : metricPercent <= 85 ? (
								<span className="font-bold text-sky-500">{metricPercent}</span>
							) : (
								<span className="font-bold text-emerald-500">{metricPercent}</span>
							)}
							% da meta atingida
						</p>
					</CardFooter>
				</>
			) : (
				<MetricCardSkeleton />
			)}
		</Card>
	);
}
