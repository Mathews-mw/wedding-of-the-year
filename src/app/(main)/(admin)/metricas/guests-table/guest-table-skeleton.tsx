import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

export function GuestTableSkeleton() {
	return Array.from({ length: 10 }).map((_, i) => {
		return (
			<TableRow key={i}>
				<TableCell>
					<Skeleton className="h-4 w-[172px]" />
				</TableCell>
				<TableCell>
					<Skeleton className="h-4 w-[148px]" />
				</TableCell>
				<TableCell>
					<Skeleton className="h-4 w-[110px]" />
				</TableCell>
				<TableCell>
					<Skeleton className="h-4 w-[200px]" />
				</TableCell>
			</TableRow>
		);
	});
}
