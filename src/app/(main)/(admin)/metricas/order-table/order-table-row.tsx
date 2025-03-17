'use client';

import dayjs from 'dayjs';
import { useState } from 'react';
import { Order } from '@prisma/client';

import { OrderDetailsDialog } from './order-details-dialog';
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

	const orderCreatedAtFormatted = dayjs(order.createdAt).format('DD/MM/YYYY [-] HH:mm');
	const orderCreatedDistanceToNow = dayjs(order.createdAt).fromNow();

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="xs">
							<Search className="size-4" />
							<span className="sr-only">Detalhes da compra</span>
						</Button>
					</DialogTrigger>

					<OrderDetailsDialog open={isDetailsOpen} orderId={order.id} />
				</Dialog>
			</TableCell>

			<TableCell className="font-mono text-xs">{order.id}</TableCell>

			<TableCell>
				<time title={orderCreatedAtFormatted}>{orderCreatedDistanceToNow}</time>
			</TableCell>

			<TableCell className="font-medium">{order.customerName}</TableCell>

			<TableCell>
				<OrderStatus status={order.status ?? 'IN_ANALYSIS'} />
			</TableCell>
		</TableRow>
	);
}
