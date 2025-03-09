import Image from 'next/image';
import { motion } from 'motion/react';
import { Product } from '@prisma/client';
import { twMerge } from 'tailwind-merge';

import { useCart } from '@/context/cart-context';

import { ProductDetailsDialog } from './dialogs/product-details-dialog';

import { HandHeart, ShoppingBag } from 'lucide-react';

interface IProps {
	product: Product;
}

export function ProductItem({ product }: IProps) {
	const { items } = useCart();

	return (
		<motion.div
			key={product.id}
			whileHover={{ scale: 1.03 }}
			transition={{ type: 'spring', stiffness: 400, damping: 10 }}
			className={twMerge([
				'flex flex-col items-center justify-center space-y-2 rounded-[6px] border border-slate-200 px-4 pt-1 pb-4 shadow-sm',
				`${product.available ? 'opacity-100' : 'opacity-50'}`,
			])}
		>
			{product.amount > 0 && (
				<div className="flex w-full justify-end">
					<span className="text-[10px] font-bold">{product.amount} UN</span>
				</div>
			)}

			<Image
				src={product.image}
				quality={100}
				alt={product.title}
				width={320}
				height={320}
				className="h-[208px] w-[208px] rounded-lg object-cover"
			/>

			<span className="text-center text-sm">{product.title}</span>

			<span className="font-semibold text-slate-600">
				{product.price.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}
			</span>

			{items.find((item) => item.productId === product.id) ? (
				<div className="flex items-center justify-center gap-2 text-rose-400">
					<ShoppingBag className="h-5 w-5" />
					<span>No carrinho</span>
				</div>
			) : product.available ? (
				<ProductDetailsDialog product={product} />
			) : (
				<div className="flex items-center justify-center gap-2 text-rose-400">
					<HandHeart className="h-5 w-5" />
					<span>Esgotado</span>
				</div>
			)}
		</motion.div>
	);
}
