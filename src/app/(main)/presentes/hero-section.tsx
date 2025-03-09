'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export function HeroSection() {
	return (
		<div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-8">
			<div>
				<motion.div
					animate={{ opacity: 1, x: 0 }}
					initial={{ opacity: 0, x: -100 }}
					transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
				>
					<h3 className="px-2 text-2xl font-semibold">Lista de presentes</h3>

					<p className="mt-4 px-2 text-justify">
						Dê uma olhadinha em nossa lista de presentes. Ficaremos muito felizes com sua contribuição.
					</p>
				</motion.div>
			</div>

			<motion.div
				animate={{ opacity: 1, x: 0 }}
				initial={{ opacity: 0, x: 100 }}
				transition={{ duration: 1, ease: 'easeIn', type: 'spring' }}
			>
				<Image
					src="/wedding-gifts.png"
					width={1440}
					height={520}
					quality={100}
					alt=""
					className="h-96 rounded-[6px] object-cover"
				/>
			</motion.div>
		</div>
	);
}
