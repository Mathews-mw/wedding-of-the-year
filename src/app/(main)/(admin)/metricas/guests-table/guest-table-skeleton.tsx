import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

export function GuestTableSkeleton() {
	return Array.from({ length: 10 }).map((_, i) => {
		return (
			<TableRow key={i}>
				<TableCell>
					<Button disabled variant="outline" size="xs">
						<Search className="h-3 w-3" />
						<span className="sr-only">Detalhes do pedido</span>
					</Button>
				</TableCell>
				<TableCell className="font-mono text-xs font-medium">
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
				<TableCell>
					<Skeleton className="h-4 w-[64px]" />
				</TableCell>
			</TableRow>
		);
	});
}