import { Product } from '@prisma/client';

import { TableCell, TableRow } from '@/components/ui/table';

interface IOrderTableRowProps {
	product: Product;
}

export function ProductTableRow({ product }: IOrderTableRowProps) {
	return (
		<TableRow>
			<TableCell>{product.title}</TableCell>
			<TableCell>{product.price.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</TableCell>
			<TableCell align="center">{product.quantityAvailable}</TableCell>
			<TableCell align="center">{product.available ? '✅' : '❌'}</TableCell>
		</TableRow>
	);
}
