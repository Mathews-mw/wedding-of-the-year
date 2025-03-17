import { useQuery } from '@tanstack/react-query';

import { MetricCardSkeleton } from './metric-card-skeleton';

import { DollarSign } from 'lucide-react';
import { getMetricsRevenue } from '@/app/api/@requests/get-metrics-revenue';

export function CardRevenue() {
	const { data: response } = useQuery({
		queryKey: ['metrics-revenue'],
		queryFn: getMetricsRevenue,
	});

	const metricPercent = response ? Math.ceil((response.purchases_total_sum / response.products_total_sum) * 100) : 0;

	return (
		<div className="space-y-2.5 rounded-lg border p-4 shadow-sm">
			<div className="flex items-center gap-2">
				<DollarSign className="size-6 text-emerald-500" />
				<span className="text-xl font-semibold">Arrecadação</span>
			</div>

			{response ? (
				<>
					<div className="space-y-1">
						<div>
							<span className="text-4xl font-bold tracking-tight">
								{response.purchases_total_sum.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</span>
							<span className="font-semibold tracking-tight">
								{' '}
								/ de{' '}
								{response.products_total_sum.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})}
							</span>
						</div>
					</div>

					<div>
						<p className="text-muted-foreground text-base">
							{metricPercent <= 40 ? (
								<span className="font-bold text-rose-400">{metricPercent}</span>
							) : metricPercent <= 85 ? (
								<span className="font-bold text-sky-500">{metricPercent}</span>
							) : (
								<span className="font-bold text-emerald-500">{metricPercent}</span>
							)}
							% da meta atingida
						</p>
					</div>
				</>
			) : (
				<MetricCardSkeleton />
			)}
		</div>
	);
}
