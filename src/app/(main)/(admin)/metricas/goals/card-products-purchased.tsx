import { useQuery } from '@tanstack/react-query';

import { getMetricsProductsPurchased } from '@/app/api/@requests/get-metrics-products-purchased';

import { MetricCardSkeleton } from './metric-card-skeleton';

import { Gift } from 'lucide-react';

export function CardProductsPurchased() {
	const { data: response } = useQuery({
		queryKey: ['metrics-products-purchased'],
		queryFn: getMetricsProductsPurchased,
	});

	const totalPercent = response ? Math.ceil((response.total_purchased / response.total_products) * 100) : 0;

	return (
		<div className="space-y-2.5 rounded-lg border p-4 shadow-sm">
			<div className="flex items-center gap-2">
				<Gift className="size-6 text-rose-400" />
				<span className="text-xl font-semibold">Produtos Adquiridos</span>
			</div>

			{response ? (
				<>
					<div className="space-y-1">
						<div>
							<span className="text-4xl font-bold tracking-tight">{response.total_purchased}</span>
							<span className="font-semibold tracking-tight"> / de {response.total_products} produtos</span>
						</div>
					</div>

					<div>
						<p className="text-muted-foreground text-base">
							{totalPercent <= 40 ? (
								<span className="font-bold text-rose-400">{totalPercent}</span>
							) : totalPercent <= 85 ? (
								<span className="font-bold text-sky-500">{totalPercent}</span>
							) : (
								<span className="font-bold text-emerald-500">{totalPercent}</span>
							)}
							% dos presentes comprados
						</p>
					</div>
				</>
			) : (
				<MetricCardSkeleton />
			)}
		</div>
	);
}
