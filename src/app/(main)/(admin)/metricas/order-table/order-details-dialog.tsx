'use client';

import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getOrderDetails } from '@/app/api/@requests/get-order-details';

import { OrderStatus } from '@/components/order-status';
import { OrderDetailsSkeleton } from './order-details-skeleton';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface IOrderDetailsProps {
	orderId: string;
	open: boolean;
}

export function OrderDetailsDialog({ orderId, open }: IOrderDetailsProps) {
	const { data: order } = useQuery({
		queryKey: ['order', orderId],
		queryFn: () => getOrderDetails({ orderId }),
		enabled: open,
	});

	const orderTotalAmount = useMemo(() => {
		return order?.orderProducts.reduce((amount, product) => {
			return (amount += product.itemQuantity * product.price);
		}, 0);
	}, [order]);

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle className="mt-4">
					Pedido: <span className="text-sm">{order?.checkoutId}</span>
				</DialogTitle>
				<DialogDescription>Detalhes do pedido</DialogDescription>
			</DialogHeader>

			{order ? (
				<div className="space-y-6">
					<Table>
						<TableBody>
							<TableRow>
								<TableCell className="text-muted-foreground">Presenteador</TableCell>
								<TableCell className="flex justify-end font-bold">{order.customerName}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">Status</TableCell>
								<TableCell className="flex justify-end">
									<OrderStatus status={order.status} />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">E-mail</TableCell>
								<TableCell className="flex justify-end">{order.customerEmail}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">Data da compra</TableCell>
								<TableCell className="flex justify-end">
									{dayjs(order.createdAt).format('DD [de] MMMM [às] HH:mm')}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>

					{order.status !== 'CANCELED' && (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Produto</TableHead>
									<TableHead className="text-right">Qtd.</TableHead>
									<TableHead className="text-right">Preço</TableHead>
									<TableHead className="text-right">Subtotal</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{order.orderProducts.map((item) => {
									return (
										<TableRow key={item.id}>
											<TableCell>{item.itemName}</TableCell>
											<TableCell className="text-right">{item.itemQuantity}</TableCell>
											<TableCell className="text-right">
												{item.product.price.toLocaleString('pt-BR', {
													style: 'currency',
													currency: 'BRL',
												})}
											</TableCell>
											<TableCell className="text-right">
												{(item.product.price * item.itemQuantity).toLocaleString('pt-BR', {
													style: 'currency',
													currency: 'BRL',
												})}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
							<TableFooter>
								<TableCell colSpan={3}>Total do pedido</TableCell>
								<TableCell className="text-right font-bold">
									{orderTotalAmount?.toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									})}
								</TableCell>
							</TableFooter>
						</Table>
					)}
				</div>
			) : (
				<OrderDetailsSkeleton />
			)}
		</DialogContent>
	);
}
