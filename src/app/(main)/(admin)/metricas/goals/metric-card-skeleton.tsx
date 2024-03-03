import { Skeleton } from '@/components/ui/skeleton';
import { CardContent, CardFooter } from '@/components/ui/card';

export function MetricCardSkeleton() {
	return (
		<>
			<CardContent className="space-y-1">
				<div className="flex items-baseline gap-1">
					<Skeleton className="h-12 w-36" />
					<span className="font-semibold tracking-tight"> / </span>
					<Skeleton className="h-4 w-52" />
				</div>
			</CardContent>

			<CardFooter>
				<Skeleton className="mt-1 h-5 w-64" />
			</CardFooter>
		</>
	);
}
