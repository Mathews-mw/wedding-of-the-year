type EOrderStatus = 'AUTHORIZED' | 'PAID' | 'IN_ANALYSIS' | 'DECLINED' | 'CANCELED';

interface IOrderStatusProps {
	status: EOrderStatus;
}

const orderStatusMap: Record<EOrderStatus, string> = {
	AUTHORIZED: 'Autorizada',
	PAID: 'Pago',
	IN_ANALYSIS: 'Em análise',
	DECLINED: 'Recusada',
	CANCELED: 'Cancelada',
};

export function OrderStatus({ status }: IOrderStatusProps) {
	return (
		<div className="flex items-center gap-2">
			{status === 'AUTHORIZED' && (
				<span data-testid="badge" className="h-2 w-2 rounded-full bg-sky-500" />
			)}

			{status === 'PAID' && (
				<span data-testid="badge" className="h-2 w-2 rounded-full bg-emerald-500" />
			)}

			{status === 'IN_ANALYSIS' && (
				<span data-testid="badge" className="h-2 w-2 rounded-full bg-orange-500" />
			)}

			{status === 'DECLINED' && (
				<span data-testid="badge" className="h-2 w-2 rounded-full bg-zinc-500" />
			)}

			{status === 'CANCELED' && (
				<span data-testid="badge" className="h-2 w-2 rounded-full bg-rose-500" />
			)}

			<span className="font-medium text-muted-foreground">{orderStatusMap[status]}</span>
		</div>
	);
}
