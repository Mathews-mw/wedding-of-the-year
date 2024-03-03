import { useQuery } from '@tanstack/react-query';

import { MetricCardSkeleton } from './metric-card-skeleton';
import { getMetricsGiftsPurchased } from '@/app/api/@requests/get-metrics-gifts-purchased';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Gift } from 'lucide-react';

export function CardGiftsPurchased() {
	const { data: response } = useQuery({
		queryKey: ['metrics-gifts-purchased'],
		queryFn: getMetricsGiftsPurchased,
	});

	const totalPercent = response
		? Math.ceil((response.totalPurchased / response.totalGifts) * 100)
		: 0;

	return (
		<Card className="text-slate-600">
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-xl font-semibold">Presentes Adquiridos</CardTitle>
				<Gift className="h-5 w-5 text-rose-400" />
			</CardHeader>

			{response ? (
				<>
					<CardContent className="space-y-1">
						<div>
							<span className="text-5xl font-bold tracking-tight">
								{response.totalPurchased}
							</span>
							<span className="font-semibold tracking-tight">
								{' '}
								/ de {response.totalGifts} presentes
							</span>
						</div>
					</CardContent>

					<CardFooter>
						<p className="text-base text-muted-foreground">
							{totalPercent <= 40 ? (
								<span className="font-bold text-rose-400">{totalPercent}</span>
							) : totalPercent <= 85 ? (
								<span className="font-bold text-sky-500">{totalPercent}</span>
							) : (
								<span className="font-bold text-emerald-500">{totalPercent}</span>
							)}
							% dos presentes comprados
						</p>
					</CardFooter>
				</>
			) : (
				<MetricCardSkeleton />
			)}
		</Card>
	);
}
