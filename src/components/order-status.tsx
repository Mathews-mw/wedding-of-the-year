import { OrderStatus as PrismaOrderStatus } from '@prisma/client';

interface IOrderStatusProps {
	status: PrismaOrderStatus;
}

const orderStatusMap: Record<PrismaOrderStatus, string> = {
	AUTHORIZED: 'Autorizada',
	PAID: 'Pago',
	IN_ANALYSIS: 'Em análise',
	DECLINED: 'Recusada',
	CANCELED: 'Cancelada',
	AWAITING: 'Aguardando',
	CONFIRMED: 'Confirmado',
};

export function OrderStatus({ status }: IOrderStatusProps) {
	return (
		<div className="flex items-center gap-2">
			{status === 'AUTHORIZED' && <span data-testid="badge" className="h-2 w-2 rounded-full bg-sky-400" />}

			{status === 'PAID' && <span data-testid="badge" className="h-2 w-2 rounded-full bg-emerald-400" />}

			{status === 'IN_ANALYSIS' && <span data-testid="badge" className="h-2 w-2 rounded-full bg-orange-400" />}

			{status === 'DECLINED' && <span data-testid="badge" className="h-2 w-2 rounded-full bg-zinc-400" />}

			{status === 'CANCELED' && <span data-testid="badge" className="h-2 w-2 rounded-full bg-rose-400" />}

			{status === 'AWAITING' && <span data-testid="badge" className="h-2 w-2 rounded-full bg-amber-400" />}

			<span className="text-muted-foreground font-medium">{orderStatusMap[status]}</span>
		</div>
	);
}
