import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { ShoppingCart } from 'lucide-react';
import EmptyCart from '@/../public/empty-cart.png';

export function EmptyCartModal() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<ShoppingCart className="size-5" />
					Carrinho vazio
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Meu carrinho de presentes</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col items-center justify-center">
					<Image src={EmptyCart} quality={100} alt="Empty Cart" className="h-60 w-60 object-cover" />

					<div className="text-muted-foreground flex flex-col items-center">
						<span>Parece meio vazio por aqui...</span>
						<span>Que tal adicionar algum presente?</span>
					</div>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Fechar</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
