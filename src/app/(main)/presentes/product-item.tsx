import Image from 'next/image';
import { motion } from 'motion/react';
import { Product } from '@prisma/client';
import { twMerge } from 'tailwind-merge';

import { useCart } from '@/context/cart-context';

import { HandHeart, ShoppingBag } from 'lucide-react';
import { ProductDetailsDialog } from './dialogs/product-details-dialog';

interface IProps {
	product: Product;
}

export function ProductItem({ product }: IProps) {
	const { items } = useCart();

	return (
		<motion.div
			key={product.id}
			whileHover={{ scale: 1.01 }}
			transition={{ type: 'spring', stiffness: 400, damping: 10 }}
			className={twMerge([
				'flex flex-col items-center justify-center space-y-2 rounded-[6px] border p-4 shadow-sm',
				`${product.available ? 'opacity-100' : 'opacity-50'}`,
			])}
		>
			<Image
				src={product.image}
				quality={100}
				priority={true}
				alt={product.title}
				width={320}
				height={320}
				className="h-[320px] w-[320px] rounded object-cover"
			/>

			<span title={product.title} className="line-clamp-1 text-center">
				{product.title}
			</span>

			<span className="font-semibold">
				{product.price.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				})}
			</span>

			{items.find((item) => item.product.id === product.id) ? (
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
