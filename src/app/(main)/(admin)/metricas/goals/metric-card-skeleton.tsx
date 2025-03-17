import { Skeleton } from '@/components/ui/skeleton';

export function MetricCardSkeleton() {
	return (
		<>
			<div className="space-y-1">
				<div className="flex items-baseline gap-1">
					<Skeleton className="h-12 w-14" />
					<span className="font-semibold tracking-tight"> / </span>
					<Skeleton className="h-4 w-24" />
				</div>
			</div>

			<div>
				<Skeleton className="mt-1 h-5 w-44" />
			</div>
		</>
	);
}
