'use client';

import dayjs from 'dayjs';
import { useState } from 'react';
import { Order } from '@prisma/client';

import { OrderDetails } from './order-details';
import { Button } from '@/components/ui/button';
import { OrderStatus } from '@/components/order-status';
import { TableCell, TableRow } from '@/components/ui/table';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { Search } from 'lucide-react';

interface IOrderTableRowProps {
	order: Order;
}

export function OrderTableRow({ order }: IOrderTableRowProps) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	const orderCreatedAtFormatted = dayjs(order.created_at).format('DD/MM/YYYY [-] HH:mm');
	const orderCreatedDistanceToNow = dayjs(order.created_at).fromNow();

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Search className="h-3 w-3" />
							<span className="sr-only">Detalhes da compra</span>
						</Button>
					</DialogTrigger>

					<OrderDetails open={isDetailsOpen} orderId={order.id} />
				</Dialog>
			</TableCell>
			<TableCell className="font-mono text-xs font-medium">{order.id}</TableCell>
			<TableCell className="text-muted-foreground">
				<time title={orderCreatedAtFormatted}>{orderCreatedDistanceToNow}</time>
			</TableCell>
			<TableCell>
				<OrderStatus status={order.status ?? 'IN_ANALYSIS'} />
			</TableCell>
			<TableCell className="font-medium">{order.customerName}</TableCell>
		</TableRow>
	);
}
