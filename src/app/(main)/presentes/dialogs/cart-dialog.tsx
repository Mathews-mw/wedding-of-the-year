'use client';

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

import { useRouter } from 'next/navigation';
import { ArrowRight, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableFooter, TableRow } from '@/components/ui/table';

interface IProps {
	isOpen: boolean;
	onOpen: (open: boolean) => void;
}

export function CartDialog({ isOpen, onOpen }: IProps) {
	const { items: cart, removeFromCart } = useCart();

	const router = useRouter();

	const totalGiftsValue = cart.reduce((amount, value) => {
		return (amount += value.product.price * value.quantity);
	}, 0);

	const totalGiftsValueFormatted = totalGiftsValue.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});

	return (
		<Dialog open={isOpen} onOpenChange={onOpen}>
			<DialogContent className="max-h-[720px] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Seu carrinho</DialogTitle>
				</DialogHeader>

				<Table>
					<TableBody>
						{cart.map((item) => {
							return (
								<TableRow key={item.product.id} className="w-[76px]">
									<TableCell>
										<Button size="xs" variant="outline" onClick={() => removeFromCart({ productId: item.product.id })}>
											Remover
										</Button>
									</TableCell>
									<TableCell align="left">
										<Image
											src={item.product.image}
											width={40}
											height={40}
											alt={item.product.title}
											className="h-[40px] w-[40px] rounded-[4px] object-cover"
										/>
									</TableCell>
									<TableCell align="left">
										<p title={item.product.title} className="w-[200px] truncate">
											{item.product.title}
										</p>
									</TableCell>
									<TableCell className="text-right">
										{item.product.price.toLocaleString('pt-BR', {
											style: 'currency',
											currency: 'BRL',
										})}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>

					<TableFooter>
						<TableRow>
							<TableCell colSpan={3}>Total</TableCell>
							<TableCell className="text-right font-bold">{totalGiftsValueFormatted}</TableCell>
						</TableRow>
					</TableFooter>
				</Table>

				<DialogFooter>
					<Button onClick={() => router.push('/carrinho')}>
						Continuar
						<ArrowRight />
					</Button>

					<DialogClose asChild>
						<Button variant="outline">Fechar</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
