import { Product } from '@prisma/client';

import { useCart } from '@/context/cart-context';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Gift } from 'lucide-react';

interface IProps {
	product: Product;
}

export function ProductDetailsDialog({ product }: IProps) {
	const { addToCart } = useCart();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<Gift className="size-5" />
					Presentear
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>{product.title}</DialogTitle>
				</DialogHeader>

				<div className="flex w-full items-start gap-2">
					<span>Valor do presente: </span>
					<strong>
						{product.price.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</strong>
				</div>

				<DialogFooter>
					<Button onClick={() => addToCart({ productId: product.id, price: product.price, quantity: 1 })}>
						Adicionar ao carrinho
					</Button>

					<DialogClose asChild>
						<Button variant="outline">Fechar</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
